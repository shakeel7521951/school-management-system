import { useState, useCallback, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaLink,
    FaHeading,
    FaListUl,
    FaListOl,
    FaImage,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaPalette,
    FaUndo,
    FaRedo,
    FaPrint,
    FaDownload,
    FaSave,
    FaPlus,
    FaColumns,
    FaArrowLeft,
    FaArrowRight,
    FaUpload,
    FaGlobe,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Custom Image extension with resize handles
const ResizableImage = Image.extend({
    name: 'resizableImage',

    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: '100%',
                parseHTML: element => element.getAttribute('data-width') || '100%',
                renderHTML: attributes => {
                    return {
                        'data-width': attributes.width,
                        style: `width: ${attributes.width}; max-width: 100%; cursor: move; position: relative; display: block;`,
                    }
                },
            },
            height: {
                default: 'auto',
                parseHTML: element => element.getAttribute('data-height') || 'auto',
                renderHTML: attributes => {
                    return {
                        'data-height': attributes.height,
                        style: `height: ${attributes.height}; cursor: move; position: relative; display: block;`,
                    }
                },
            },
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            float: {
                default: null,
                parseHTML: element => element.style.float || null,
                renderHTML: attributes => {
                    if (attributes.float) {
                        return {
                            style: `float: ${attributes.float}; margin: 10px;`,
                        }
                    }
                    return {};
                },
            },
        }
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const dom = document.createElement('div');
            dom.className = 'resizable-image-container';
            dom.style.display = 'inline-block';
            dom.style.position = 'relative';
            dom.style.margin = '10px';
            dom.style.verticalAlign = 'top';

            if (node.attrs.float) {
                dom.style.float = node.attrs.float;
                dom.style.margin = `10px ${node.attrs.float === 'left' ? '10px 10px 10px 0' : '0 10px 10px 10px'}`;
            }

            const img = document.createElement('img');
            img.src = node.attrs.src;
            img.alt = node.attrs.alt;
            img.title = node.attrs.title;
            img.style.width = node.attrs.width;
            img.style.height = node.attrs.height;
            img.style.maxWidth = '100%';
            img.style.cursor = 'move';
            img.style.display = 'block';
            img.draggable = false;

            // Create resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'resize-handle';
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.right = '-5px';
            resizeHandle.style.bottom = '-5px';
            resizeHandle.style.width = '12px';
            resizeHandle.style.height = '12px';
            resizeHandle.style.background = '#4299e1';
            resizeHandle.style.border = '2px solid white';
            resizeHandle.style.borderRadius = '50%';
            resizeHandle.style.cursor = 'nwse-resize';
            resizeHandle.style.zIndex = '10';
            resizeHandle.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

            // Create float controls
            const floatControls = document.createElement('div');
            floatControls.className = 'float-controls';
            floatControls.style.position = 'absolute';
            floatControls.style.top = '-30px';
            floatControls.style.left = '50%';
            floatControls.style.transform = 'translateX(-50%)';
            floatControls.style.display = 'none';
            floatControls.style.background = 'white';
            floatControls.style.border = '1px solid #ccc';
            floatControls.style.borderRadius = '4px';
            floatControls.style.padding = '4px';
            floatControls.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            floatControls.style.zIndex = '20';

            const leftBtn = document.createElement('button');
            leftBtn.innerHTML = '⬅';
            leftBtn.title = 'Align Left';
            leftBtn.style.padding = '4px 8px';
            leftBtn.style.margin = '0 2px';
            leftBtn.style.border = 'none';
            leftBtn.style.background = node.attrs.float === 'left' ? '#e2e8f0' : 'transparent';
            leftBtn.style.borderRadius = '2px';
            leftBtn.style.cursor = 'pointer';

            const centerBtn = document.createElement('button');
            centerBtn.innerHTML = '⏺';
            centerBtn.title = 'Center';
            centerBtn.style.padding = '4px 8px';
            centerBtn.style.margin = '0 2px';
            centerBtn.style.border = 'none';
            centerBtn.style.background = !node.attrs.float ? '#e2e8f0' : 'transparent';
            centerBtn.style.borderRadius = '2px';
            centerBtn.style.cursor = 'pointer';

            const rightBtn = document.createElement('button');
            rightBtn.innerHTML = '➡';
            rightBtn.title = 'Align Right';
            rightBtn.style.padding = '4px 8px';
            rightBtn.style.margin = '0 2px';
            rightBtn.style.border = 'none';
            rightBtn.style.background = node.attrs.float === 'right' ? '#e2e8f0' : 'transparent';
            rightBtn.style.borderRadius = '2px';
            rightBtn.style.cursor = 'pointer';

            floatControls.appendChild(leftBtn);
            floatControls.appendChild(centerBtn);
            floatControls.appendChild(rightBtn);

            dom.appendChild(img);
            dom.appendChild(resizeHandle);
            dom.appendChild(floatControls);

            // Show/hide float controls
            dom.addEventListener('mouseenter', () => {
                floatControls.style.display = 'block';
            });
            dom.addEventListener('mouseleave', () => {
                floatControls.style.display = 'none';
            });

            // Float control handlers
            leftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const pos = getPos();
                editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    float: 'left',
                }));
                leftBtn.style.background = '#e2e8f0';
                centerBtn.style.background = 'transparent';
                rightBtn.style.background = 'transparent';
            });

            centerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const pos = getPos();
                editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    float: null,
                }));
                leftBtn.style.background = 'transparent';
                centerBtn.style.background = '#e2e8f0';
                rightBtn.style.background = 'transparent';
            });

            rightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const pos = getPos();
                editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    float: 'right',
                }));
                leftBtn.style.background = 'transparent';
                centerBtn.style.background = 'transparent';
                rightBtn.style.background = '#e2e8f0';
            });

            let isResizing = false;
            let startX, startY, startWidth, startHeight;

            const onMouseMove = (e) => {
                if (!isResizing) return;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                const newWidth = Math.max(100, startWidth + dx);
                const newHeight = Math.max(100, startHeight + dy);

                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
            };

            const onMouseUp = () => {
                isResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                // Update the node attributes with new dimensions
                const pos = getPos();
                editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    width: `${img.style.width}`,
                    height: `${img.style.height}`,
                }));
            };

            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(img.style.width) || img.offsetWidth;
                startHeight = parseInt(img.style.height) || img.offsetHeight;

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            // Make image draggable within the editor
            let isDragging = false;
            let dragStartX, dragStartY, initialX, initialY;

            const onDragMove = (e) => {
                if (!isDragging) return;

                const dx = e.clientX - dragStartX;
                const dy = e.clientY - dragStartY;

                dom.style.marginLeft = `${initialX + dx}px`;
                dom.style.marginTop = `${initialY + dy}px`;
            };

            const onDragEnd = () => {
                if (!isDragging) return;

                isDragging = false;
                dom.style.zIndex = '';
                document.body.style.userSelect = '';

                document.removeEventListener('mousemove', onDragMove);
                document.removeEventListener('mouseup', onDragEnd);
            };

            img.addEventListener('mousedown', (e) => {
                if (e.target === resizeHandle) return;

                isDragging = true;
                dragStartX = e.clientX;
                dragStartY = e.clientY;
                initialX = dom.style.marginLeft ? parseInt(dom.style.marginLeft) : 0;
                initialY = dom.style.marginTop ? parseInt(dom.style.marginTop) : 0;

                dom.style.zIndex = '1000';
                document.body.style.userSelect = 'none';

                document.addEventListener('mousemove', onDragMove);
                document.addEventListener('mouseup', onDragEnd);
            });

            return {
                dom,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== 'resizableImage') return false;
                    img.src = updatedNode.attrs.src;
                    img.alt = updatedNode.attrs.alt;
                    img.title = updatedNode.attrs.title;
                    img.style.width = updatedNode.attrs.width;
                    img.style.height = updatedNode.attrs.height;

                    // Update float controls state
                    leftBtn.style.background = updatedNode.attrs.float === 'left' ? '#e2e8f0' : 'transparent';
                    centerBtn.style.background = !updatedNode.attrs.float ? '#e2e8f0' : 'transparent';
                    rightBtn.style.background = updatedNode.attrs.float === 'right' ? '#e2e8f0' : 'transparent';

                    return true;
                },
            };
        };
    },
});

export default function BlogEditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogTitle, setBlogTitle] = useState("Untitled Blog");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState("#000000");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarContent, setSidebarContent] = useState("");
    const [activeSidebarTab, setActiveSidebarTab] = useState("notes");
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            Heading.configure({ levels: [1, 2, 3] }),
            Bold,
            Italic,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "text-blue-600 underline",
                },
            }),
            BulletList,
            OrderedList,
            ListItem,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TextStyle,
            Color,
            ResizableImage,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: `<p>Start writing your blog here...</p>`,
        onUpdate: ({ editor }) => {
            // Handle click events for adding content on sides
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            // You can add custom logic here for side content addition
        },
    });

    // ----- Link -----
    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl);
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    }, [editor]);

    // ----- Image from URL -----
    const addImageFromUrl = useCallback(() => {
        if (!editor) return;
        if (imageUrl.trim() === "") {
            toast.error("Please enter an image URL");
            return;
        }

        editor.chain().focus().setImage({
            src: imageUrl,
            width: "400px",
            height: "auto"
        }).run();
        setImageUrl("");
        setShowImageOptions(false);
        toast.success("Image added from URL!");
    }, [editor, imageUrl]);

    // ----- Image from File -----
    const addImageFromFile = useCallback(() => {
        if (!editor) return;
        fileInputRef.current?.click();
    }, [editor]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            editor.chain().focus().setImage({
                src: imageUrl,
                width: "400px",
                height: "auto"
            }).run();
            toast.success("Image uploaded successfully!");
        };
        reader.onerror = () => {
            toast.error("Failed to upload image");
        };
        reader.readAsDataURL(file);

        // Reset file input
        event.target.value = '';
        setShowImageOptions(false);
    };

    // ----- Color -----
    const handleColorChange = (color) => {
        setCurrentColor(color);
        editor.chain().focus().setColor(color).run();
    };

    // ----- Add Column Layout -----
    const addColumns = useCallback(() => {
        if (!editor) return;

        const columnHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div style="padding: 10px; border: 1px dashed #ccc; min-height: 100px;">
                    <p>Left Column - Start typing here...</p>
                </div>
                <div style="padding: 10px; border: 1px dashed #ccc; min-height: 100px;">
                    <p>Right Column - Start typing here...</p>
                </div>
            </div>
        `;

        editor.chain().focus().insertContent(columnHTML).run();
    }, [editor]);

    // ----- Export PDF -----
    const exportPDF = async () => {
        try {
            const content = document.createElement("div");
            content.style.padding = "20px";
            content.style.background = "white";
            content.innerHTML = `<h1 style="text-align: center; margin-bottom: 30px;">${blogTitle}</h1>${editor.getHTML()}`;

            if (sidebarContent) {
                content.innerHTML += `<div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ccc;">
                    <h2>Sidebar Notes</h2>
                    <div>${sidebarContent}</div>
                </div>`;
            }

            document.body.appendChild(content);
            const canvas = await html2canvas(content, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            });
            document.body.removeChild(content);

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({ unit: "mm", format: "a4" });
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 10, width, height);
            pdf.save(`${blogTitle.replace(/\s+/g, "_")}.pdf`);
            toast.success("PDF exported successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to export PDF");
        }
    };

    // ----- Print -----
    const printBlog = () => {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${blogTitle}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                    img { max-width: 100%; height: auto; }
                    .sidebar-content { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ccc; }
                    .resizable-image-container { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1 style="text-align: center; margin-bottom: 30px;">${blogTitle}</h1>
                ${editor.getHTML()}
                ${sidebarContent ? `
                    <div class="sidebar-content">
                        <h2>Sidebar Notes</h2>
                        <div>${sidebarContent}</div>
                    </div>
                ` : ''}
            </body>
            </html>
        `;
        const win = window.open("", "_blank");
        win.document.write(html);
        win.document.close();
        win.onload = () => win.print();
    };

    // ----- Save -----
    const save = async () => {
        if (!blogTitle.trim() || blogTitle === "Untitled Blog") {
            toast.error("Blog title is required!");
            return;
        }
        if (!editor) return;
        setIsSaving(true);
        const json = editor.getJSON();
        const html = editor.getHTML();

        try {
            let url = `${BACKEND_URL}/createBlog`;
            let method = "POST";
            if (id) {
                url = `${BACKEND_URL}/update-blog/${id}`;
                method = "PUT";
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: blogTitle,
                    content: json,
                    html,
                    sidebarContent
                }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            toast.success(`Blog ${id ? "updated" : "saved"} successfully!`);
            navigate(-1);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save blog");
        } finally {
            setIsSaving(false);
        }
    };

    // ----- Load Blog -----
    useEffect(() => {
        const loadBlog = async () => {
            if (!id || !editor) return;
            try {
                const res = await axios.get(`${BACKEND_URL}/single-blog/${id}`);
                const data = res.data;
                if (data.title) setBlogTitle(data.title);
                if (data.content) editor.commands.setContent(data.content);
                if (data.sidebarContent) setSidebarContent(data.sidebarContent);
            } catch {
                toast.error("Failed to load blog");
            }
        };
        loadBlog();
    }, [id, editor]);

    if (!editor)
        return <div className="h-screen flex items-center justify-center">Loading editor...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Title Bar */}
            <div className="bg-white border-b p-4 px-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 flex-1">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                            autoFocus
                            className="text-2xl font-bold border-b-2 border-blue-500 px-2 py-1 w-full"
                        />
                    ) : (
                        <h1
                            className="text-2xl font-bold cursor-pointer hover:text-blue-600"
                            onClick={() => setIsEditingTitle(true)}
                        >
                            {blogTitle}
                        </h1>
                    )}
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {id ? `Editing Blog: ${id}` : "New Blog"}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
                    >
                        {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
                        {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                    </button>
                    <button
                        onClick={save}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FaSave /> {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {sidebarOpen && (
                    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex space-x-2">
                                {["notes", "media", "layout"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveSidebarTab(tab)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${activeSidebarTab === tab
                                                ? "bg-blue-100 text-blue-700"
                                                : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            {activeSidebarTab === "notes" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Sidebar Notes</h3>
                                    <textarea
                                        value={sidebarContent}
                                        onChange={(e) => setSidebarContent(e.target.value)}
                                        placeholder="Add your notes, references, or additional content here..."
                                        className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        This content will be included when exporting or printing.
                                    </p>
                                </div>
                            )}

                            {activeSidebarTab === "media" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Add Media</h3>

                                    {/* Image Options */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowImageOptions(!showImageOptions)}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                                        >
                                            <FaImage /> Add Image
                                        </button>

                                        {showImageOptions && (
                                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                <div className="space-y-3">
                                                    {/* URL Option */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Add from URL
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={imageUrl}
                                                                onChange={(e) => setImageUrl(e.target.value)}
                                                                placeholder="Paste image URL here"
                                                                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                                                            />
                                                            <button
                                                                onClick={addImageFromUrl}
                                                                className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                                                                title="Add from URL"
                                                            >
                                                                <FaGlobe />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* File Upload Option */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Upload from Computer
                                                        </label>
                                                        <button
                                                            onClick={addImageFromFile}
                                                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                                                        >
                                                            <FaUpload /> Choose File
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                            <p className="font-medium">Image Features:</p>
                                            <ul className="list-disc list-inside mt-1 space-y-1">
                                                <li>Click and drag to move images</li>
                                                <li>Use resize handle to change size</li>
                                                <li>Use alignment buttons for positioning</li>
                                                <li>Supports both URL and file upload</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSidebarTab === "layout" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Page Layout</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={addColumns}
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                        >
                                            <FaColumns /> Add Two Columns
                                        </button>

                                        <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                                            <p>Add a two-column layout to organize your content side by side.</p>
                                        </div>

                                        <div className="border-t pt-3">
                                            <h4 className="font-medium mb-2">Content Positioning</h4>
                                            <p className="text-sm text-gray-600">
                                                Click anywhere in the editor to add content. Use the alignment tools in the toolbar for left/right positioning.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-white border-b p-3 flex flex-wrap gap-2 px-6">
                        <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-gray-200 rounded" title="Undo">
                            <FaUndo />
                        </button>
                        <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-gray-200 rounded" title="Redo">
                            <FaRedo />
                        </button>

                        <select
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "paragraph") editor.chain().focus().setParagraph().run();
                                else editor.chain().focus().toggleHeading({ level: +val }).run();
                            }}
                            className="p-2 border rounded"
                            title="Text Format"
                        >
                            <option value="paragraph">Paragraph</option>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>

                        {/* Text style */}
                        <div className="flex items-center gap-1 border-l pl-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
                                title="Bold"
                            >
                                <FaBold />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
                                title="Italic"
                            >
                                <FaItalic />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
                                title="Underline"
                            >
                                <FaUnderline />
                            </button>
                            <button onClick={setLink} className="p-2 hover:bg-gray-200 rounded" title="Add Link">
                                <FaLink />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                    className="p-2 hover:bg-gray-200 rounded"
                                    title="Text Color"
                                >
                                    <FaPalette />
                                </button>
                                {showColorPicker && (
                                    <div className="absolute z-10 bg-white p-2 border rounded shadow-md mt-1">
                                        <input
                                            type="color"
                                            value={currentColor}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                            className="w-8 h-8 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Lists */}
                        <div className="flex items-center gap-1 border-l pl-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
                                title="Bullet List"
                            >
                                <FaListUl />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
                                title="Numbered List"
                            >
                                <FaListOl />
                            </button>
                        </div>

                        {/* Alignment */}
                        <div className="flex items-center gap-1 border-l pl-2">
                            <button
                                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                                className="p-2 hover:bg-gray-200 rounded"
                                title="Align Left"
                            >
                                <FaAlignLeft />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                                className="p-2 hover:bg-gray-200 rounded"
                                title="Align Center"
                            >
                                <FaAlignCenter />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                                className="p-2 hover:bg-gray-200 rounded"
                                title="Align Right"
                            >
                                <FaAlignRight />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 ml-auto border-l pl-2">
                            <button onClick={printBlog} className="p-2 hover:bg-gray-200 rounded" title="Print">
                                <FaPrint />
                            </button>
                            <button onClick={exportPDF} className="p-2 hover:bg-gray-200 rounded" title="Export PDF">
                                <FaDownload />
                            </button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 overflow-auto bg-white shadow-inner">
                        <div className="max-w-4xl mx-auto p-8 min-h-full bg-white">
                            <EditorContent
                                editor={editor}
                                className="prose prose-lg max-w-none min-h-[500px] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden file input for image upload */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />

            <style jsx>{`
                .resizable-image-container:hover .resize-handle {
                    display: block;
                }
                .resize-handle {
                    display: none;
                }
                .resizable-image-container:hover .float-controls {
                    display: block !important;
                }
                .ProseMirror {
                    min-height: 500px;
                }
                .ProseMirror:focus {
                    outline: none;
                }
                .ProseMirror img {
                    transition: box-shadow 0.2s ease;
                }
                .ProseMirror img:hover {
                    box-shadow: 0 0 0 2px #4299e1;
                }
                .ProseMirror .resizable-image-container {
                    transition: all 0.2s ease;
                }
                .ProseMirror .resizable-image-container:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}