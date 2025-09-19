import Form from "../models/Form.js";

export const createForm = async (req, res) => {
    try {
        const { title, content, html } = req.body;
        const form = new Form({
            title,
            content,
            html
        });

        const savedForm = await form.save();
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getFormHTML = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Set proper content type and send the HTML
        res.set('Content-Type', 'text/html');
        res.send(form.html);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const singleForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Return as JSON
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, html } = req.body;

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, content, html },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ message: "Form deleted successfully", deletedForm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
