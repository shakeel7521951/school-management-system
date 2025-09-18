import React, { useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Node } from '@tiptap/core';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import { FaBold, FaItalic, FaUnderline, FaLink, FaHeading, FaListUl, FaListOl, 
         FaTable, FaImage, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
         FaPalette, FaSave, FaFilePdf, FaPrint, FaUndo, FaRedo, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// --- Custom node: input field ---
const InputField = Node.create({
  name: 'inputField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Text input' },
      name: { default: '' },
      placeholder: { default: '' },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="input-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'input-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-1' }, HTMLAttributes.label],
      ['input', { 
        type: 'text', 
        placeholder: HTMLAttributes.placeholder, 
        class: 'border p-2 rounded w-full', 
        name: HTMLAttributes.name,
        required: HTMLAttributes.required
      }]
    ]
  },
});

// --- Custom node: select field ---
const SelectField = Node.create({
  name: 'selectField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Select' },
      name: { default: '' },
      options: { default: ['Option 1', 'Option 2'] },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="select-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    const opts = (HTMLAttributes.options || []).map(o => ['option', { value: o }, o]);
    return ['div', { 'data-type': 'select-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-1' }, HTMLAttributes.label],
      ['select', { 
        name: HTMLAttributes.name, 
        class: 'border p-2 rounded w-full',
        required: HTMLAttributes.required
      }, ['option', { value: '' }, '-- Select --'], ...opts]
    ]
  },
});

// --- Custom node: date field ---
const DateField = Node.create({
  name: 'dateField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Date' },
      name: { default: '' },
      required: { default: false },
    }
  },
  parseHTML() { return [{ tag: 'div[data-type="date-field"]' }] },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'date-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-1' }, HTMLAttributes.label],
      ['input', { 
        type: 'date', 
        name: HTMLAttributes.name, 
        class: 'border p-2 rounded w-full',
        required: HTMLAttributes.required
      }]
    ]
  },
});

// --- Custom node: checkbox field ---
const CheckboxField = Node.create({
  name: 'checkboxField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Checkbox' },
      name: { default: '' },
      options: { default: ['Option 1'] },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="checkbox-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    const checkboxes = (HTMLAttributes.options || []).map((o, i) => [
      'div', { class: 'flex items-center mb-1' },
      ['input', { 
        type: 'checkbox', 
        id: `${HTMLAttributes.name}_${i}`,
        name: HTMLAttributes.name, 
        value: o,
        class: 'mr-2',
        required: HTMLAttributes.required
      }],
      ['label', { for: `${HTMLAttributes.name}_${i}`, class: 'text-sm' }, o]
    ]);
    
    return ['div', { 'data-type': 'checkbox-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-2' }, HTMLAttributes.label],
      ...checkboxes
    ]
  },
});

// --- Custom node: radio field ---
const RadioField = Node.create({
  name: 'radioField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Radio' },
      name: { default: '' },
      options: { default: ['Option 1'] },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="radio-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    const radios = (HTMLAttributes.options || []).map((o, i) => [
      'div', { class: 'flex items-center mb-1' },
      ['input', { 
        type: 'radio', 
        id: `${HTMLAttributes.name}_${i}`,
        name: HTMLAttributes.name, 
        value: o,
        class: 'mr-2',
        required: HTMLAttributes.required
      }],
      ['label', { for: `${HTMLAttributes.name}_${i}`, class: 'text-sm' }, o]
    ]);
    
    return ['div', { 'data-type': 'radio-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-2' }, HTMLAttributes.label],
      ...radios
    ]
  },
});

// --- Custom node: textarea field ---
const TextareaField = Node.create({
  name: 'textareaField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'Textarea' },
      name: { default: '' },
      placeholder: { default: '' },
      rows: { default: 4 },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="textarea-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'textarea-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-1' }, HTMLAttributes.label],
      ['textarea', { 
        placeholder: HTMLAttributes.placeholder, 
        class: 'border p-2 rounded w-full', 
        name: HTMLAttributes.name,
        rows: HTMLAttributes.rows,
        required: HTMLAttributes.required
      }]
    ]
  },
});

// --- Custom node: file upload field ---
const FileField = Node.create({
  name: 'fileField',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      label: { default: 'File upload' },
      name: { default: '' },
      accept: { default: '*' },
      required: { default: false },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="file-field"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'file-field', class: 'my-3' },
      ['label', { class: 'block text-sm font-medium mb-1' }, HTMLAttributes.label],
      ['input', { 
        type: 'file', 
        class: 'border p-2 rounded w-full', 
        name: HTMLAttributes.name,
        accept: HTMLAttributes.accept,
        required: HTMLAttributes.required
      }]
    ]
  },
});

export default function EditorPage() {
  const [savedId, setSavedId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Underline,
      Link.configure({ openOnClick: false }),
      BulletList,
      OrderedList,
      ListItem,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Image.configure({ inline: true }),
      InputField,
      SelectField,
      DateField,
      CheckboxField,
      RadioField,
      TextareaField,
      FileField
    ],
    content: `<h1>Advanced Form Builder</h1>
    <p>Create professional forms with rich text formatting and various field types.</p>`,
    onUpdate: ({ editor }) => {
      // Handle editor updates if needed
    }
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertInput = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Input label', 'Full name');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const placeholder = window.prompt('Placeholder (optional)', '');
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'inputField', attrs: { label, name, placeholder, required } }).run();
  }, [editor]);

  const insertSelect = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Select label', 'Subject');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const optionsRaw = window.prompt('Comma-separated options', 'Math,Science,English');
    const options = optionsRaw ? optionsRaw.split(',').map(s => s.trim()) : ['Option 1', 'Option 2'];
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'selectField', attrs: { label, name, options, required } }).run();
  }, [editor]);

  const insertDate = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Date label', 'Date of birth');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'dateField', attrs: { label, name, required } }).run();
  }, [editor]);

  const insertCheckbox = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Checkbox group label', 'Interests');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const optionsRaw = window.prompt('Comma-separated options', 'Sports,Music,Reading');
    const options = optionsRaw ? optionsRaw.split(',').map(s => s.trim()) : ['Option 1'];
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'checkboxField', attrs: { label, name, options, required } }).run();
  }, [editor]);
  
  const insertRadio = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Radio group label', 'Gender');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const optionsRaw = window.prompt('Comma-separated options', 'Male,Female,Other');
    const options = optionsRaw ? optionsRaw.split(',').map(s => s.trim()) : ['Option 1'];
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'radioField', attrs: { label, name, options, required } }).run();
  }, [editor]);

  const insertTextarea = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('Textarea label', 'Comments');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const placeholder = window.prompt('Placeholder (optional)', '');
    const rows = window.prompt('Number of rows', '4');
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'textareaField', attrs: { label, name, placeholder, rows, required } }).run();
  }, [editor]);

  const insertFile = useCallback(() => {
    if (!editor) return;
    const label = window.prompt('File upload label', 'Upload file');
    if (!label) return;
    const name = label.toLowerCase().replace(/\s+/g, '_');
    const accept = window.prompt('Accepted file types (e.g. .pdf,.docx or image/*)', '*');
    const required = window.confirm('Is this field required?');
    editor.chain().focus().insertContent({ type: 'fileField', attrs: { label, name, accept, required } }).run();
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    const rows = parseInt(window.prompt('Number of rows', '3')) || 3;
    const cols = parseInt(window.prompt('Number of columns', '3')) || 3;
    
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  }, [editor]);

  const handleColorChange = (color) => {
    if (!editor) return;
    setCurrentColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const generateHTML = useCallback(() => {
    if (!editor) return '';
    
    // Get the editor's HTML content
    const htmlContent = editor.getHTML();
    
    // Create a complete HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; padding: 20px; }
        @media print {
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="max-w-4xl mx-auto">
        ${htmlContent}
        <div class="no-print mt-8 pt-4 border-t">
            <p class="text-sm text-gray-500">Form created with Advanced Form Builder</p>
        </div>
    </div>
</body>
</html>`;
  }, [editor]);

  const downloadHTML = useCallback(() => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateHTML]);

  const exportPDF = useCallback(async () => {
    if (!editor) return;
    
    try {
      // Create a temporary div to hold the content for PDF generation
      const content = document.createElement('div');
      content.innerHTML = editor.getHTML();
      content.style.width = '794px'; // A4 width in pixels at 96dpi
      content.style.padding = '20px';
      content.style.backgroundColor = 'white';
      document.body.appendChild(content);
      
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      document.body.removeChild(content);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('form.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  }, [editor]);

  const save = async () => {
    if (!editor) return;
    setIsSaving(true);
    
    const json = editor.getJSON();
    const html = generateHTML();
    const title = window.prompt('Form title', 'Untitled form') || 'Untitled form';
    
    try {
      const res = await fetch('http://localhost:5000/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: json, 
          html: html,
          title 
        })
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      
      const data = await res.json();
      setSavedId(data._id);
      alert('Form saved successfully! ID: ' + data._id);
    } catch (err) {
      console.error('Save error:', err);
      alert('Save failed. Please check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const printForm = () => {
    const htmlContent = generateHTML();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for images to load before printing
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      // printWindow.close(); // Uncomment if you want to automatically close after printing
    };
  };

  if (!editor) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top toolbar */}
      <div className="bg-white border-b p-2 flex flex-wrap gap-1">
        <div className="flex items-center gap-1 mr-4">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Undo"
          >
            <FaUndo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Redo"
          >
            <FaRedo />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r pr-4 mr-4">
          <select
            value={editor.getAttributes('heading').level || 'paragraph'}
            onChange={(e) => {
              const level = e.target.value;
              if (level === 'paragraph') {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
              }
            }}
            className="p-1 border rounded"
          >
            <option value="paragraph">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        <div className="flex items-center gap-1 border-r pr-4 mr-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <FaUnderline />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded hover:bg-gray-200"
              title="Text color"
            >
              <FaPalette />
            </button>
            {showColorPicker && (
              <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg">
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-8"
                />
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="mt-1 p-1 border rounded text-xs w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 border-r pr-4 mr-4">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="Align left"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="Align center"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="Align right"
          >
            <FaAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
            title="Justify"
          >
            <FaAlignJustify />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r pr-4 mr-4">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet list"
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Numbered list"
          >
            <FaListOl />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r pr-4 mr-4">
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Add link"
          >
            <FaLink />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-200"
            title="Insert image"
          >
            <FaImage />
          </button>
          <button
            onClick={insertTable}
            className="p-2 rounded hover:bg-gray-200"
            title="Insert table"
          >
            <FaTable />
          </button>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={downloadHTML}
            className="p-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
            title="Download HTML"
          >
            <FaDownload /> HTML
          </button>
          <button
            onClick={save}
            disabled={isSaving}
            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1 disabled:opacity-50"
            title="Save form"
          >
            <FaSave /> {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={exportPDF}
            className="p-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
            title="Export to PDF"
          >
            <FaFilePdf /> PDF
          </button>
          <button
            onClick={printForm}
            className="p-2 rounded bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-1"
            title="Print form"
          >
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Form fields toolbar */}
      <div className="bg-gray-200 p-2 flex flex-wrap gap-2">
        <span className="text-sm font-medium py-2">Form Fields:</span>
        <button onClick={insertInput} className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm">
          Text Input
        </button>
        <button onClick={insertTextarea} className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm">
          Textarea
        </button>
        <button onClick={insertSelect} className="px-3 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 text-sm">
          Dropdown
        </button>
        <button onClick={insertDate} className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm">
          Date
        </button>
        <button onClick={insertCheckbox} className="px-3 py-1 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm">
          Checkboxes
        </button>
        <button onClick={insertRadio} className="px-3 py-1 rounded bg-pink-100 text-pink-800 hover:bg-pink-200 text-sm">
          Radio Buttons
        </button>
        <button onClick={insertFile} className="px-3 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200 text-sm">
          File Upload
        </button>
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-auto p-4">
        <div ref={editorRef} className="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
      </div>

      {savedId && (
        <div className="p-4 bg-blue-50 border-t">
          <div className="max-w-4xl mx-auto text-sm">
            <span className="font-medium">Form saved successfully!</span> ID: <code className="bg-blue-100 p-1 rounded">{savedId}</code>
            <span className="ml-4">View at: <code className="bg-blue-100 p-1 rounded">/view/{savedId}</code></span>
          </div>
        </div>
      )}
    </div>
  );
}