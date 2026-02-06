import CreateEventForm from "@/components/CreateEventForm";

const CreateEventPage = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-left font-bold tracking-tight">
          Create New <br /> Developer Event
        </h1>
        <p className="text-light-200 text-lg max-w-2xl">
          Fill in the details below to host your own hackathon, meetup, or
          conference. Reach thousands of developers across the globe.
        </p>
      </div>

      <div className="glass p-8 sm:p-12 mb-10">
        <CreateEventForm />
      </div>
    </section>
  );
};

export default CreateEventPage;
