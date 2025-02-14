import React, { useState } from 'react';
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

const ExportDialog = ({ isOpen, onClose, flowRef, schema }) => {
    const [exportType, setExportType] = useState('png');

    const handleExport = async () => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                switch (exportType) {
                    case 'png':
                        await exportAsPNG();
                        break;
                    case 'svg':
                        await exportAsSVG();
                        break;
                    case 'pdf':
                        await exportAsPDF();
                        break;
                    case 'markdown':
                        exportAsMarkdown();
                        break;
                    default:
                        break;
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            loading: 'Exporting schema...',
            success: `Schema exported as ${exportType.toUpperCase()}`,
            error: 'Failed to export schema'
        });

        onClose();
    };

    const exportAsPNG = async () => {
        if (flowRef.current) {
            try {
                // Add padding and ensure white background
                const dataUrl = await toPng(flowRef.current, {
                    backgroundColor: '#ffffff',
                    padding: 20,
                    pixelRatio: 2 // Higher quality
                });
                const link = document.createElement('a');
                link.download = `${schema.title || 'schema'}.png`;
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Error exporting PNG:', error);
            }
        }
    };

    const exportAsSVG = async () => {
        if (flowRef.current) {
            try {
                const dataUrl = await toSvg(flowRef.current, {
                    backgroundColor: '#ffffff',
                    padding: 20
                });
                const link = document.createElement('a');
                link.download = `${schema.title || 'schema'}.svg`;
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Error exporting SVG:', error);
            }
        }
    };

    const exportAsPDF = async () => {
        if (flowRef.current) {
            try {
                const dataUrl = await toPng(flowRef.current, {
                    backgroundColor: '#ffffff',
                    padding: 20,
                    pixelRatio: 2
                });

                // Calculate aspect ratio
                const { width, height } = flowRef.current.getBoundingClientRect();
                const aspectRatio = width / height;

                // Create PDF with proper dimensions
                const pdf = new jsPDF(aspectRatio > 1 ? 'l' : 'p', 'px', [width, height]);
                pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
                pdf.save(`${schema.title || 'schema'}.pdf`);
            } catch (error) {
                console.error('Error exporting PDF:', error);
            }
        }
    };

    const exportAsMarkdown = () => {
        const markdown = generateMarkdown(schema);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.download = `${schema.title || 'schema'}.md`;
        link.href = URL.createObjectURL(blob);
        link.click();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-96">
                    <h2 className="text-xl font-semibold mb-4">Export Schema</h2>
                    <select
                        value={exportType}
                        onChange={(e) => setExportType(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    >
                        <option value="png">PNG Image</option>
                        <option value="svg">SVG Vector</option>
                        <option value="pdf">PDF Document</option>
                        <option value="markdown">Markdown Documentation</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ExportDialog;