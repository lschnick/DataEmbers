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

    setSuccessMessage("");
    try {
      const data = JSON.stringify({
        longitude: formData.get("longitude"),
        latitude: formData.get("latitude"),
        date: formData.get("date"),
        dateRange: formData.get("dateRange"),
      });
    } catch {
      setFormError("Unable to register. Please try again later.");
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  }
  return (
    <form id="calendar-form" onSubmit={formEntry}>
      {formError && <p className="error">{formError}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <label htmlFor="latitude">Latitude</label>
      <input type="text" id="latitude" name="latitude" />
      <label htmlFor="longitude">Longitude</label>
      <input type="text" id="longitude" name="longitude" />
      <label htmlFor="date">Date</label>
      <input type="text" id="date" name="date" />
      <label htmlFor="dateRange">Date Range [1-10]</label>
      <input type="text" id="dateRange" name="dateRange" />

      <input
        type="submit"
        value={isSubmitting ? "Registering..." : "Register"}
        disabled={isSubmitting}
      />
    </form>
  );
}
