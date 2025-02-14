import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Add new code types
const CODE_TYPES = {
    // ORMs
    MONGOOSE: 'mongoose',
    PRISMA: 'prisma',
    SEQUELIZE: 'sequelize',
    TYPEORM: 'typeorm',

    // Frameworks
    EXPRESS: 'express',
    FASTIFY: 'fastify',
    NESTJS: 'nestjs',

    // Other
    TYPESCRIPT: 'typescript'
};

const CodeModal = ({ isOpen, onClose }) => {
    const [codeType, setCodeType] = useState(CODE_TYPES.MONGOOSE);
    const [copied, setCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState('');

    const schema = useSelector(state => {
        const activeSchema = state.schemas.activeSchemaId;
        return state.schemas.schemas.find(s => s.id === activeSchema);
    });

    // Add new type mappings
    const typeMapping = {
        string: {
            mongoose: 'String',
            typescript: 'string',
            prisma: 'String',
            sequelize: 'DataTypes.STRING',
            typeorm: 'string'
        },
        number: {
            mongoose: 'Number',
            typescript: 'number',
            prisma: 'Int',
            sequelize: 'DataTypes.INTEGER',
            typeorm: 'number'
        },
        date: {
            mongoose: 'Date',
            typescript: 'Date',
            prisma: 'DateTime',
            sequelize: 'DataTypes.DATE',
            typeorm: 'Date'
        },
        boolean: {
            mongoose: 'Boolean',
            typescript: 'boolean',
            prisma: 'Boolean',
            sequelize: 'DataTypes.BOOLEAN',
            typeorm: 'boolean'
        }
    };

    const generateMongooseSchema = (table) => `
// ${table.name} Schema
const ${table.name}Schema = new mongoose.Schema({
  ${table.fields.map(field => `${field.name}: {
    type: ${typeMapping[field.type]?.mongoose || 'String'},
    required: ${field.required || false}
  }`).join(',\n  ')}
}, { 
  timestamps: true,
  versionKey: false 
});\n
const ${table.name} = mongoose.model('${table.name}', ${table.name}Schema);\n`;

    const generateExpressRoutes = (table) => `
// ${table.name} Routes
router.get('/${table.name.toLowerCase()}s', async (req, res) => {
  try {
    const items = await ${table.name}.find(req.query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/${table.name.toLowerCase()}s/:id', async (req, res) => {
  try {
    const item = await ${table.name}.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/${table.name.toLowerCase()}s', async (req, res) => {
  try {
    const item = new ${table.name}(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});\n`;

    const generateTypeScriptInterface = (table) => `
interface I${table.name} {
  id: string;
  ${table.fields.map(field =>
        `${field.name}${field.required ? '' : '?'}: ${typeMapping[field.type]?.typescript || 'string'};`
    ).join('\n  ')}
  createdAt: Date;
  updatedAt: Date;
}\n`;

    const generatePrismaSchema = (table) => `
model ${table.name} {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  ${table.fields.map(field =>
        `${field.name}  ${typeMapping[field.type]?.prisma || 'String'}  ${field.required ? '' : '?'}`
    ).join('\n  ')}
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}\n`;

    // Add new generator functions
    const generateSequelizeModel = (table) => `
// ${table.name} Model
class ${table.name} extends Model {}
${table.name}.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ${table.fields.map(field => `${field.name}: {
    type: ${typeMapping[field.type]?.sequelize || 'DataTypes.STRING'},
    allowNull: ${!field.required}
  }`).join(',\n  ')}
}, {
  sequelize,
  modelName: '${table.name}'
});\n`;

    const generateTypeOrmEntity = (table) => `
@Entity()
export class ${table.name} {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  ${table.fields.map(field => `
  @Column({ nullable: ${!field.required} })
  ${field.name}: ${typeMapping[field.type]?.typeorm || 'string'};`).join('\n')}

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}\n`;

    const generateFastifyRoutes = (table) => `
// ${table.name} Routes
fastify.get('/${table.name.toLowerCase()}s', async (request, reply) => {
  try {
    const items = await ${table.name}.find(request.query);
    return items;
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
});

fastify.get('/${table.name.toLowerCase()}s/:id', async (request, reply) => {
  try {
    const item = await ${table.name}.findById(request.params.id);
    if (!item) return reply.code(404).send({ message: 'Not found' });
    return item;
  } catch (error) {
    reply.code(500).send({ message: error.message });
  }
});

fastify.post('/${table.name.toLowerCase()}s', async (request, reply) => {
  try {
    const item = new ${table.name}(request.body);
    const saved = await item.save();
    reply.code(201).send(saved);
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});\n`;

    const generateNestJSCode = (table) => `
// ${table.name}.entity.ts
@Entity()
export class ${table.name} {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  ${table.fields.map(field => `
  @Column({ nullable: ${!field.required} })
  ${field.name}: ${typeMapping[field.type]?.typescript || 'string'};`).join('\n')}

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ${table.name}.controller.ts
@Controller('${table.name.toLowerCase()}s')
export class ${table.name}Controller {
  constructor(private readonly service: ${table.name}Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createDto: Create${table.name}Dto) {
    return this.service.create(createDto);
  }
}

// ${table.name}.service.ts
@Injectable()
export class ${table.name}Service {
  constructor(
    @InjectRepository(${table.name})
    private repository: Repository<${table.name}>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  create(createDto: Create${table.name}Dto) {
    const item = this.repository.create(createDto);
    return this.repository.save(item);
  }
}\n`;

    // Update generateFullCode function
    const generateFullCode = () => {
        if (!schema) return '';

        switch (codeType) {
            case CODE_TYPES.MONGOOSE:
                return `const mongoose = require('mongoose');\n\n${schema.tables.map(generateMongooseSchema).join('\n')
                    }`;

            case CODE_TYPES.EXPRESS:
                return `const express = require('express');
const router = express.Router();\n${schema.tables.map(generateExpressRoutes).join('\n')
                    }\nmodule.exports = router;`;

            case CODE_TYPES.TYPESCRIPT:
                return schema.tables.map(generateTypeScriptInterface).join('\n');

            case CODE_TYPES.PRISMA:
                return `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}\n${schema.tables.map(generatePrismaSchema).join('\n')
                    }`;

            // Add new cases
            case CODE_TYPES.SEQUELIZE:
                return `const { Model, DataTypes } = require('sequelize');\n\n${schema.tables.map(generateSequelizeModel).join('\n')
                    }`;

            case CODE_TYPES.TYPEORM:
                return `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';\n\n${schema.tables.map(generateTypeOrmEntity).join('\n')
                    }`;

            case CODE_TYPES.FASTIFY:
                return `const fastify = require('fastify')();\n\n${schema.tables.map(generateFastifyRoutes).join('\n')
                    }`;

            case CODE_TYPES.NESTJS:
                return `import { Controller, Get, Post, Body, Param, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';\n\n${schema.tables.map(generateNestJSCode).join('\n')
                    }`;

            default:
                return '';
        }
    };

    useEffect(() => {
        const code = generateFullCode();
        if (code) {
            const language = codeType === CODE_TYPES.TYPESCRIPT ? 'typescript' : 'javascript';
            const highlighted = hljs.highlight(code, { language }).value;
            setHighlightedCode(highlighted);
        }
    }, [schema, codeType]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Generated Code</h2>
                    <div className="flex gap-2">
                        <select
                            className="border rounded p-1"
                            onChange={(e) => setCodeType(e.target.value)}
                            value={codeType}
                        >
                            <optgroup label="ORMs">
                                <option value={CODE_TYPES.MONGOOSE}>Mongoose Schema</option>
                                <option value={CODE_TYPES.PRISMA}>Prisma Schema</option>
                                <option value={CODE_TYPES.SEQUELIZE}>Sequelize Model</option>
                                <option value={CODE_TYPES.TYPEORM}>TypeORM Entity</option>
                            </optgroup>
                            <optgroup label="Frameworks">
                                <option value={CODE_TYPES.EXPRESS}>Express Routes</option>
                                <option value={CODE_TYPES.FASTIFY}>Fastify Routes</option>
                                <option value={CODE_TYPES.NESTJS}>NestJS (Controller/Service)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={CODE_TYPES.TYPESCRIPT}>TypeScript Interfaces</option>
                            </optgroup>
                        </select>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <CopyToClipboard text={generateFullCode()} onCopy={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}>
                        <button
                            className={`absolute top-2 right-2 px-3 py-1 rounded text-sm transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </CopyToClipboard>

                    <div className="p-4 max-h-[60vh] overflow-auto">
                        <pre className="bg-[#282c34] p-4 rounded">
                            <code
                                className="hljs language-javascript"
                                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                            />
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeModal;