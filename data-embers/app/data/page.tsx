import CalendarForm from "@/components/CalendarForm";
import Navbar from "@/components/Navbar";
import ViirsTable from "@/components/ViirsIntake";

export default function Data() {
  return (
    <section>
      <main>
        <Navbar />
        <h1>Calendar</h1>
        <section className="form-panel">
          <CalendarForm />
        </section>
        {/* <ViirsTable /> */}
      </main>
    </section>
  );
}
