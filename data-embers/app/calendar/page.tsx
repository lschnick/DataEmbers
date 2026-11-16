import CalendarForm from "@/components/CalendarForm";
import Navbar from "@/components/Navbar";
//import ViirsTable from "@/components/ViirsIntake";

export default function Calendar() {
  return (
    <section>
      <main>
        <Navbar />
        <h1>Calendar</h1>
        <CalendarForm />
        {/* <ViirsTable /> */}
      </main>
    </section>
  );
}
