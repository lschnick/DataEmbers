"use client";
import { FormEvent, useState } from "react";

export default function CalendarForm() {
  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");
  //   const [date, setDate] = useState({});
  //   const [dateRange, setDateRange] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function formEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    setSuccessMessage("");
    try {
      const data = JSON.stringify({
        longitude: Number(formData.get("longitude")),
        latitude: Number(formData.get("latitude")),
        date: Number(formData.get("date")),
        dateRange: Number(formData.get("dateRange")),
      });
      setSuccessMessage("Fetch successful!");
      form.reset();
    } catch {
      setFormError("Unable to Fetch. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form id="calendar-form" onSubmit={formEntry} className="calendar-form">
      <label htmlFor="latitude">Latitude:</label>
      <input
        type="number"
        step="any"
        min="-90"
        max="90"
        id="latitude"
        name="latitude"
        className="form-entry"
      />

      <label htmlFor="longitude">Longitude:</label>
      <input
        type="number"
        step="any"
        min="-180"
        max="180"
        id="longitude"
        name="longitude"
        className="form-entry"
      />

      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" required />

      <label htmlFor="dateRange">Date Range [1-5]:</label>
      <input
        type="number"
        min="1"
        max="5"
        id="dateRange"
        name="dateRange"
        defaultValue={1}
        className="form-entry"
      />

      <button type="submit" disabled={isSubmitting} className="form-submit">
        {isSubmitting ? "Fetching..." : "Fetch"}
      </button>
      {formError && <p className="error">{formError}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
}
