
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function Header() {
  const [formData, setFormData] = useState({
    url: "",
    interval: "",
    threshold: "",
  });
  const [errors, setErrors] = useState({
    url: "",
    interval: "",
    threshold: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    // URL validation: must be a valid URL
    if (!formData.url) {
      newErrors.url = "URL is required.";
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.url)) {
      newErrors.url = "Invalid URL format.";
    }

    // Interval validation: must be a positive number
    if (!formData.interval) {
      newErrors.interval = "Interval is required.";
    } else if (isNaN(formData.interval) || formData.interval <= 0) {
      newErrors.interval = "Interval must be a positive number.";
    }

    // Threshold validation: must be a positive number
    if (!formData.threshold) {
      newErrors.threshold = "Threshold is required.";
    } else if (isNaN(formData.threshold) || formData.threshold <= 0) {
      newErrors.threshold = "Threshold must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // Handle successful submission logic
    }
  };

  return (
    
      <div
        className="  d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow  justify-content-center align-items-center"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          {/* URL Field */}
          <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3" aria-required>
              URL:
            </InputGroup.Text>
            <Form.Control
              id="basic-url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter a valid URL"
            />
          </InputGroup>
          {errors.url && <Form.Text className="text-danger">{errors.url}</Form.Text>}

          {/* Interval Field */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Interval in minutes</InputGroup.Text>
            <Form.Control
              name="interval"
              value={formData.interval}
              onChange={handleChange}
              placeholder="Enter interval in minutes"
            />
          </InputGroup>
          {errors.interval && (
            <Form.Text className="text-danger">{errors.interval}</Form.Text>
        )}

        {/* Threshold Field */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Threshold minutes</InputGroup.Text>
          <Form.Control
            name="threshold"
            value={formData.threshold}
            onChange={handleChange}
            placeholder="Enter threshold value"
          />
        </InputGroup>
        {errors.threshold && (
          <Form.Text className="text-danger">{errors.threshold}</Form.Text>
        )}

        {/* Create Monitor Button */}
        <Button variant="outline-secondary" type="submit" className="w-100">
          Create Monitor
        </Button>
      </Form>
    </div>
  );
}

export default Header;
