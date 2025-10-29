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
import { Placeholder } from '@tiptap/extension-placeholder';

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
    FaTimes,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Enhanced Image extension with better text wrapping
const ResizableImage = Image.extend({
    name: 'resizableImage',

    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: '400px',
                parseHTML: element => element.getAttribute('data-width') || '400px',
                renderHTML: attributes => {
                    return {
                        'data-width': attributes.width,
                        style: `width: ${attributes.width}; max-width: 100%;`,
                    }
                },
            },
            height: {
                default: 'auto',
                parseHTML: element => element.getAttribute('data-height') || 'auto',
                renderHTML: attributes => {
                    return {
                        'data-height': attributes.height,
                        style: `height: ${attributes.height};`,
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
                parseHTML: element => {
                    const float = element.style.float || element.getAttribute('data-float');
                    return float || null;
                },
                renderHTML: attributes => {
                    if (attributes.float) {
                        return {
                            'data-float': attributes.float,
                            style: `float: ${attributes.float}; margin: ${attributes.float === 'left' ? '0 15px 15px 0' : '0 0 15px 15px'}; shape-outside: margin-box;`,
                        }
                    }
                    return {
                        style: 'margin: 15px auto; display: block;'
                    };
                },
            },
        }
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const container = document.createElement('div');
            container.className = 'floating-image-container';
            container.style.display = 'block';
            container.style.margin = '10px 0';
            container.style.position = 'relative';

            if (node.attrs.float) {
                container.style.float = node.attrs.float;
                container.style.margin = node.attrs.float === 'left' ? '0 15px 15px 0' : '0 0 15px 15px';
                container.style.shapeOutside = 'margin-box';
            }

            const img = document.createElement('img');
            img.src = node.attrs.src;
            img.alt = node.attrs.alt;
            img.title = node.attrs.title;
            img.style.width = node.attrs.width;
            img.style.height = node.attrs.height;
            img.style.maxWidth = '100%';
            img.style.display = 'block';
            img.style.borderRadius = '4px';
            img.style.cursor = 'move';
            img.draggable = false;

            // Enhanced controls
            const controls = document.createElement('div');
            controls.className = 'image-controls';
            controls.style.position = 'absolute';
            controls.style.top = '-35px';
            controls.style.left = '50%';
            controls.style.transform = 'translateX(-50%)';
            controls.style.display = 'none';
            controls.style.background = 'white';
            controls.style.border = '1px solid #ddd';
            controls.style.borderRadius = '6px';
            controls.style.padding = '5px';
            controls.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            controls.style.zIndex = '1000';
            controls.style.gap = '2px';
            controls.style.display = 'flex';

            const alignmentButtons = [
                { icon: '⬅', value: 'left', title: 'Float Left with Text Wrap' },
                { icon: '⏹', value: 'none', title: 'No Float - Block Display' },
                { icon: '➡', value: 'right', title: 'Float Right with Text Wrap' },
                { icon: '📏', value: 'center', title: 'Center - No Text Wrap' },
            ];

            alignmentButtons.forEach(btn => {
                const button = document.createElement('button');
                button.innerHTML = btn.icon;
                button.title = btn.title;
                button.style.padding = '4px 6px';
                button.style.border = 'none';
                button.style.background = node.attrs.float === btn.value ? '#e2e8f0' : 'transparent';
                button.style.borderRadius = '3px';
                button.style.cursor = 'pointer';
                button.style.fontSize = '12px';

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const pos = getPos();
                    let newAttrs = { ...node.attrs };

                    if (btn.value === 'center') {
                        newAttrs.float = null;
                        newAttrs.width = '100%';
                    } else if (btn.value === 'none') {
                        newAttrs.float = null;
                        newAttrs.width = '400px';
                    } else {
                        newAttrs.float = btn.value;
                        newAttrs.width = node.attrs.width === '100%' ? '400px' : node.attrs.width;
                    }

                    editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, newAttrs));
                });

                controls.appendChild(button);
            });

            container.appendChild(img);
            container.appendChild(controls);

            // Show controls on hover
            container.addEventListener('mouseenter', () => {
                controls.style.display = 'flex';
            });

            container.addEventListener('mouseleave', (e) => {
                if (!container.contains(e.relatedTarget)) {
                    controls.style.display = 'none';
                }
            });

            // Resize functionality
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'resize-handle';
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.right = '-6px';
            resizeHandle.style.bottom = '-6px';
            resizeHandle.style.width = '12px';
            resizeHandle.style.height = '12px';
            resizeHandle.style.background = '#4299e1';
            resizeHandle.style.border = '2px solid white';
            resizeHandle.style.borderRadius = '50%';
            resizeHandle.style.cursor = 'nwse-resize';
            resizeHandle.style.zIndex = '10';
            resizeHandle.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            resizeHandle.style.display = 'none';

            container.appendChild(resizeHandle);

            let isResizing = false;
            let startX, startWidth;

            const onMouseMove = (e) => {
                if (!isResizing) return;

                const dx = e.clientX - startX;
                const newWidth = Math.max(200, Math.min(800, startWidth + dx));

                img.style.width = `${newWidth}px`;

                // Update container width for proper text wrapping
                if (node.attrs.float) {
                    container.style.width = `${newWidth}px`;
                }
            };

            const onMouseUp = () => {
                isResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                const pos = getPos();
                editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    width: img.style.width,
                }));
            };

            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                isResizing = true;
                startX = e.clientX;
                startWidth = parseInt(img.style.width) || img.offsetWidth;

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });

            // Show resize handle on hover
            container.addEventListener('mouseenter', () => {
                if (node.attrs.float && node.attrs.float !== 'none') {
                    resizeHandle.style.display = 'block';
                }
            });

            container.addEventListener('mouseleave', (e) => {
                if (!container.contains(e.relatedTarget) && !isResizing) {
                    resizeHandle.style.display = 'none';
                }
            });

            return {
                dom: container,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== 'resizableImage') return false;

                    img.src = updatedNode.attrs.src;
                    img.alt = updatedNode.attrs.alt;
                    img.title = updatedNode.attrs.title;
                    img.style.width = updatedNode.attrs.width;
                    img.style.height = updatedNode.attrs.height;

                    // Update container styling
                    if (updatedNode.attrs.float) {
                        container.style.float = updatedNode.attrs.float;
                        container.style.margin = updatedNode.attrs.float === 'left' ? '0 15px 15px 0' : '0 0 15px 15px';
                        container.style.width = updatedNode.attrs.width;
                        container.style.shapeOutside = 'margin-box';
                        resizeHandle.style.display = 'none';
                    } else {
                        container.style.float = 'none';
                        container.style.margin = '15px auto';
                        container.style.width = 'auto';
                        container.style.shapeOutside = 'none';
                        resizeHandle.style.display = 'none';
                    }

                    // Update controls state
                    alignmentButtons.forEach((btn, index) => {
                        const button = controls.children[index];
                        if (button) {
                            button.style.background = updatedNode.attrs.float === btn.value ? '#e2e8f0' : 'transparent';
                        }
                    });

                    return true;
                },
            };
        };
    },
});

// Custom extension for click-to-edit functionality
const ClickablePlaceholder = Placeholder.configure({
    placeholder: 'Click anywhere to start writing...',
    emptyEditorClass: 'is-editor-empty',
});

export default function BlogEditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [posterImageFile, setPosterImageFile] = useState(null);
    const [posterImagePreview, setPosterImagePreview] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState("#000000");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarContent, setSidebarContent] = useState("");
    const [activeSidebarTab, setActiveSidebarTab] = useState("details");
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [showPosterImageModal, setShowPosterImageModal] = useState(false);
    const [posterImageUrl, setPosterImageUrl] = useState("");
    const fileInputRef = useRef(null);
    const posterFileInputRef = useRef(null);
    const editorRef = useRef(null);
    const [contentImages, setContentImages] = useState([]);

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
            ClickablePlaceholder,
        ],
        content: `
            <div class="editable-section" data-placeholder="Click to start writing...">
                <p></p>
            </div>
        `,
        onUpdate: ({ editor }) => {
            // Handle content updates if needed
        },
        onFocus: ({ editor, event }) => {
            // Ensure we're focusing on editable content
            const { view } = editor;
            const { state } = view;
            const { selection } = state;
            const { $from } = selection;

            // If we're in an empty paragraph, ensure we can type
            if ($from.parent.content.size === 0) {
                editor.commands.focus();
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none min-h-[500px] focus:outline-none editable-container',
                style: 'min-height: 500px; cursor: text;',
            },
            handleClick: (view, pos, event) => {
                // When clicking in empty space, create a new paragraph at click position
                const { state } = view;
                const { doc, schema } = state;

                // Get the position where user clicked
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

                if (coordinates) {
                    const clickedPos = coordinates.pos;

                    // Check if we clicked in an empty area
                    const $pos = doc.resolve(clickedPos);
                    const node = $pos.parent;

                    // If we clicked in an empty paragraph or at the end, focus there
                    if (node.type.name === 'paragraph' && node.content.size === 0) {
                        view.dispatch(state.tr.setSelection(state.selection.constructor.near($pos)));
                        return true;
                    }

                    // If we clicked at the very end of document, add new paragraph
                    if (clickedPos >= doc.content.size - 2) {
                        const transaction = state.tr.insert(clickedPos, schema.nodes.paragraph.create());
                        view.dispatch(transaction);
                        view.dispatch(state.tr.setSelection(state.selection.constructor.near(doc.resolve(clickedPos + 1))));
                        return true;
                    }
                }

                return false;
            },
        },
    });

    // Handle editor container click for better focus management
    useEffect(() => {
        const handleEditorClick = (event) => {
            if (!editor) return;

            // If clicking on the editor container but not on specific content
            if (event.target.classList.contains('editable-container') ||
                event.target.classList.contains('ProseMirror')) {

                const { view } = editor;
                const { state } = view;
                const { doc } = state;

                // Set cursor to the end of document
                const endPos = doc.content.size - 1;
                editor.commands.focus(endPos);
            }
        };

        const editorElement = document.querySelector('.ProseMirror');
        if (editorElement) {
            editorElement.addEventListener('click', handleEditorClick);
            return () => editorElement.removeEventListener('click', handleEditorClick);
        }
    }, [editor]);

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
            height: "auto",
            float: "left"
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

        // Create preview URL for the editor
        const previewUrl = URL.createObjectURL(file);

        // Add to content images array for later upload
        setContentImages(prev => [...prev, { file, previewUrl }]);

        // Add image to editor with preview URL
        editor.chain().focus().setImage({
            src: previewUrl,
            width: "400px",
            height: "auto",
            float: "left"
        }).run();
        toast.success("Image added successfully!");

        event.target.value = '';
        setShowImageOptions(false);
    };

    // ----- Poster Image Functions -----
    const handlePosterImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);

        setPosterImageFile(file);
        setPosterImagePreview(previewUrl);
        toast.success("Poster image added successfully!");

        event.target.value = '';
        setShowPosterImageModal(false);
    };

    const addPosterImageFromUrl = () => {
        if (posterImageUrl.trim() === "") {
            toast.error("Please enter an image URL");
            return;
        }
        // For URL images, we'll store the URL directly
        setPosterImageFile(posterImageUrl); // Store URL as string
        setPosterImagePreview(posterImageUrl);
        setPosterImageUrl("");
        setShowPosterImageModal(false);
        toast.success("Poster image added from URL!");
    };

    const removePosterImage = () => {
        setPosterImageFile(null);
        setPosterImagePreview("");
        toast.info("Poster image removed");
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
            <div class="grid-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; padding: 10px; border: 1px dashed #ccc; min-height: 100px;">
                <div class="editable-column" data-placeholder="Click to write in left column..." style="padding: 10px; min-height: 50px; cursor: text;">
                    <p>Left Column - Click here to start writing...</p>
                </div>
                <div class="editable-column" data-placeholder="Click to write in right column..." style="padding: 10px; min-height: 50px; cursor: text;">
                    <p>Right Column - Click here to start writing...</p>
                </div>
            </div>
        `;

        editor.chain().focus().insertContent(columnHTML).run();
        toast.success("Two-column layout added! Click in any column to start writing.");
    }, [editor]);

    // ----- Add Image with Layout -----
    const addImageWithLayout = useCallback((layout) => {
        if (!editor) return;

        let imageHTML = '';
        if (layout === 'left' || layout === 'right') {
            imageHTML = `
                <div class="image-text-layout" style="margin: 20px 0;">
                    <img 
                        src="https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Add+Your+Image" 
                        alt="Placeholder image"
                        data-float="${layout}"
                        style="float: ${layout}; margin: ${layout === 'left' ? '0 15px 15px 0' : '0 0 15px 15px'}; width: 400px; max-width: 100%; border-radius: 4px;"
                    />
                    <p class="editable-section" data-placeholder="Click here to write text that wraps around the image...">
                        Start typing your content here. The text will automatically wrap around the ${layout} side of the image. You can continue writing and the text will flow naturally around the image.
                    </p>
                </div>
            `;
        } else {
            imageHTML = `
                <div class="full-width-image" style="margin: 20px 0;">
                    <img 
                        src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Full+Width+Image" 
                        alt="Placeholder image"
                        style="width: 100%; margin: 20px 0; border-radius: 4px;"
                    />
                    <p style="text-align: center;"><em>Full width image with centered caption</em></p>
                    <p class="editable-section" data-placeholder="Click here to continue writing after the image...">
                        Continue writing your content here...
                    </p>
                </div>
            `;
        }

        editor.chain().focus().insertContent(imageHTML).run();
        toast.success(`${layout === 'full' ? 'Full width image' : `Image ${layout} with text wrap`} added! Click to start writing.`);
    }, [editor]);

    // ----- Add Empty Paragraph at Click Position -----
    const addParagraphAtCursor = useCallback(() => {
        if (!editor) return;

        // Add a new paragraph at current cursor position
        editor.chain().focus().insertContent('<p>Start typing here...</p>').run();
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
                    body { 
                        font-family: Arial, sans-serif; 
                        padding: 20px; 
                        line-height: 1.6; 
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    img { 
                        max-width: 100%; 
                        height: auto; 
                        border-radius: 4px;
                    }
                    .floating-image-container {
                        margin: 10px 0;
                    }
                    .grid-layout {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin: 20px 0;
                    }
                    .sidebar-content { 
                        margin-top: 40px; 
                        padding-top: 20px; 
                        border-top: 2px solid #ccc; 
                    }
                    @media print {
                        body { padding: 0; }
                        .floating-image-container { break-inside: avoid; }
                        .grid-layout { break-inside: avoid; }
                    }
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
        // Validate compulsory fields
        if (!blogTitle.trim()) {
            toast.error("Blog title is required!");
            return;
        }
        if (!blogDescription.trim()) {
            toast.error("Blog description is required!");
            return;
        }
        if (!posterImageFile) {
            toast.error("Poster image is required!");
            return;
        }
        if (!editor) return;

        setIsSaving(true);

        try {
            const formData = new FormData();

            // Add text content
            formData.append('title', blogTitle);
            formData.append('description', blogDescription);
            formData.append('content', JSON.stringify(editor.getJSON()));
            formData.append('html', editor.getHTML());
            formData.append('sidebarContent', sidebarContent);

            // Add poster image - check if it's a file or URL
            if (typeof posterImageFile === 'string') {
                // If it's a URL, add as string
                formData.append('posterImage', posterImageFile);
            } else {
                // If it's a file, add the file
                formData.append('posterImage', posterImageFile);
            }

            // Add content images - only files, not URLs
            contentImages.forEach((image, index) => {
                if (image.file && typeof image.file !== 'string') {
                    formData.append('images', image.file); // Use 'images' field name
                }
            });

            console.log("FormData contents:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value instanceof File ? `File: ${value.name}` : value);
            }

            let url = `${BACKEND_URL}/create-blog`;
            let method = "POST";
            if (id) {
                url = `${BACKEND_URL}/update-blog/${id}`;
                method = "PUT";
            }

            const res = await fetch(url, {
                method,
                body: formData,
            });

            if (!res.ok) {
                let errorMessage = `HTTP ${res.status}`;
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // If response is not JSON, get the text
                    const text = await res.text();
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await res.json();
            toast.success(`Blog ${id ? "updated" : "saved"} successfully!`);
            navigate(-1);
        } catch (err) {
            console.error("Save error:", err);
            toast.error(err.message || "Failed to save blog");
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
                if (data.description) setBlogDescription(data.description);
                if (data.posterImage) {
                    setPosterImageFile(data.posterImage);
                    setPosterImagePreview(data.posterImage);
                }
                if (data.content) editor.commands.setContent(data.content);
                if (data.sidebarContent) setSidebarContent(data.sidebarContent);
            } catch {
                toast.error("Failed to load blog");
            }
        };
        loadBlog();
    }, [id, editor]);

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            if (posterImagePreview && posterImagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(posterImagePreview);
            }
            contentImages.forEach(image => {
                if (image.previewUrl && image.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(image.previewUrl);
                }
            });
        };
    }, [posterImagePreview, contentImages]);

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
                            {blogTitle || "Click to enter blog title"}
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
                                {["details", "notes", "media", "layout"].map((tab) => (
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
                            {activeSidebarTab === "details" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-3">Blog Details</h3>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Blog Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={blogTitle}
                                            onChange={(e) => setBlogTitle(e.target.value)}
                                            placeholder="Enter blog title"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            value={blogDescription}
                                            onChange={(e) => setBlogDescription(e.target.value)}
                                            placeholder="Enter blog description"
                                            rows="4"
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Poster Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Poster Image *
                                        </label>
                                        {posterImagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={posterImagePreview}
                                                    alt="Poster preview"
                                                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                                />
                                                <button
                                                    onClick={removePosterImage}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                <p className="text-gray-500 mb-2">No poster image selected</p>
                                                <button
                                                    onClick={() => setShowPosterImageModal(true)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                                >
                                                    Add Poster Image
                                                </button>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            * Required field. This image will be used as the blog thumbnail.
                                        </p>
                                    </div>
                                </div>
                            )}

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
                                                <li>Use alignment buttons for text wrapping</li>
                                                <li>Supports both URL and file upload</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSidebarTab === "layout" && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Content Layout</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={addColumns}
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                        >
                                            <FaColumns /> Add Two Columns
                                        </button>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => addImageWithLayout('left')}
                                                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 flex flex-col items-center gap-1"
                                            >
                                                <FaAlignLeft className="text-lg" />
                                                <span className="text-xs">Image Left</span>
                                            </button>
                                            <button
                                                onClick={() => addImageWithLayout('right')}
                                                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 flex flex-col items-center gap-1"
                                            >
                                                <FaAlignRight className="text-lg" />
                                                <span className="text-xs">Image Right</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => addImageWithLayout('full')}
                                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
                                        >
                                            <FaImage /> Full Width Image
                                        </button>

                                        <button
                                            onClick={addParagraphAtCursor}
                                            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                                        >
                                            <FaPlus /> Add Empty Paragraph
                                        </button>

                                        <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                                            <p className="font-medium mb-1">Layout Tips:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li><strong>Image Left/Right:</strong> Text automatically wraps around images</li>
                                                <li><strong>Full Width:</strong> Images span entire content width</li>
                                                <li><strong>Two Columns:</strong> Split content into side-by-side sections</li>
                                                <li><strong>Click Anywhere:</strong> Start writing from any clicked position</li>
                                                <li>Hover over images to see alignment controls</li>
                                            </ul>
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
                                className="prose prose-lg max-w-none min-h-[500px] focus:outline-none editable-container"
                                ref={editorRef}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden file inputs */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
            <input
                type="file"
                ref={posterFileInputRef}
                onChange={handlePosterImageUpload}
                accept="image/*"
                className="hidden"
            />

            {/* Poster Image Modal */}
            {showPosterImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add Poster Image</h3>
                            <button
                                onClick={() => setShowPosterImageModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* URL Option */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Add from URL
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={posterImageUrl}
                                        onChange={(e) => setPosterImageUrl(e.target.value)}
                                        placeholder="Paste image URL here"
                                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                                    />
                                    <button
                                        onClick={addPosterImageFromUrl}
                                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
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
                                    onClick={() => posterFileInputRef.current?.click()}
                                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                                >
                                    <FaUpload /> Choose File
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowPosterImageModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .ProseMirror {
                    min-height: 500px;
                    overflow-wrap: break-word;
                    cursor: text;
                }

                .ProseMirror:focus {
                    outline: none;
                }

                /* Floating images with text wrap */
                .ProseMirror .floating-image-container {
                    transition: all 0.3s ease;
                    border-radius: 4px;
                }

                .ProseMirror .floating-image-container[style*="float: left"],
                .ProseMirror .floating-image-container[style*="float: right"] {
                    shape-margin: 1em;
                }

                .ProseMirror .floating-image-container:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .ProseMirror .floating-image-container img {
                    border-radius: 4px;
                    display: block;
                }

                .ProseMirror .image-controls {
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .ProseMirror .floating-image-container:hover .image-controls {
                    opacity: 1;
                }

                .ProseMirror .resize-handle {
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .ProseMirror .floating-image-container:hover .resize-handle {
                    opacity: 1;
                }

                /* Ensure text wraps properly around floated images */
                .ProseMirror p {
                    overflow-wrap: break-word;
                    text-align: justify;
                }

                /* Center aligned images */
                .ProseMirror .floating-image-container:not([style*="float"]) {
                    text-align: center;
                    margin: 20px auto;
                }

                .ProseMirror .floating-image-container:not([style*="float"]) img {
                    margin: 0 auto;
                }

                /* Better text wrapping */
                .ProseMirror p:has(+ .floating-image-container[style*="float: left"]),
                .ProseMirror p:has(+ .floating-image-container[style*="float: right"]) {
                    overflow: hidden;
                }

                .ProseMirror .floating-image-container[style*="float: left"] + p,
                .ProseMirror .floating-image-container[style*="float: right"] + p {
                    margin-top: 0;
                }

                /* Grid layout styling */
                .ProseMirror .grid-layout {
                    border: 1px dashed #ccc;
                    padding: 20px;
                    margin: 20px 0;
                    background: #f9f9f9;
                }

                .ProseMirror .editable-column {
                    min-height: 50px;
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    background: white;
                    cursor: text;
                }

                .ProseMirror .editable-column p {
                    margin: 0;
                }

                .ProseMirror .editable-column:focus {
                    outline: 2px solid #3b82f6;
                }

                /* Placeholder styling */
                .ProseMirror .is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }

                .ProseMirror .editable-section {
                    cursor: text;
                    min-height: 24px;
                }

                /* Make empty paragraphs clearly editable */
                .ProseMirror p:empty::before {
                    content: 'Click to start writing...';
                    color: #6b7280;
                    font-style: italic;
                }

                .ProseMirror .editable-column:empty::before {
                    content: 'Click to write in this column...';
                    color: #6b7280;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}