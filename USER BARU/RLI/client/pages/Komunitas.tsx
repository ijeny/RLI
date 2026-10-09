import {
  Calendar,
  Users,
  MapPin,
  Heart,
  Share2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Komunitas() {
  const [activeTab, setActiveTab] = useState("events");

  const events = [
    {
      id: 1,
      title: "Cleaning Day Pantai Ketapang",
      date: "15 Juni 2024",
      time: "08:00 - 12:00",
      location: "Pantai Ketapang",
      participants: 150,
      image: "🌊",
      description:
        "Program pembersihan pantai bersama komunitas untuk menjaga kebersihan laut",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Workshop Komposting Rumahan",
      date: "20 Juni 2024",
      time: "14:00 - 17:00",
      location: "Kantor IFK",
      participants: 75,
      image: "♻️",
      description:
        "Workshop interaktif cara membuat kompos dari sampah organik rumah tangga",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Penanaman Pohon 1000 Pohon",
      date: "22 Juni 2024",
      time: "07:00 - 11:00",
      location: "Lahan IFK",
      participants: 200,
      image: "🌳",
      description:
        "Program penanaman pohon bersama untuk penghijauan dan mitigasi perubahan iklim",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Diskusi Round Table Ekonomi Sirkular",
      date: "25 Juni 2024",
      time: "19:00 - 21:00",
      location: "Aula IFK",
      participants: 50,
      image: "🎤",
      description:
        "Diskusi mendalam tentang model ekonomi sirkular dan aplikasinya di IFK",
      status: "upcoming",
    },
  ];

  const workshops = [
    {
      id: 1,
      title: "Budidaya Maggot Black Soldier Fly",
      mentor: "Budi Santoso",
      date: "10 Juni 2024",
      duration: "3 Hari",
      participants: 45,
      icon: "🐛",
      description:
        "Workshop lengkap tentang cara budidaya maggot BSF dari pemula hingga expert",
    },
    {
      id: 2,
      title: "Teknik Pertanian Organik Modern",
      mentor: "Siti Rahayu",
      date: "17 Juni 2024",
      duration: "2 Hari",
      participants: 60,
      icon: "🌾",
      description:
        "Workshop praktik teknik pertanian organik menggunakan teknologi modern",
    },
    {
      id: 3,
      title: "Manajemen Limbah & Zero Waste",
      mentor: "Ahmad Wijaya",
      date: "24 Juni 2024",
      duration: "2 Hari",
      participants: 38,
      icon: "🗑️",
      description:
        "Workshop strategi pengelolaan limbah dan implementasi zero waste di rumah",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "event",
      title: "Cleaning Day Pantai Ketapang Selesai",
      date: "15 Juni 2024",
      participants: 150,
      photo: "📸",
      description: "Berhasil mengumpulkan 500 kg sampah plastik dari pantai",
    },
    {
      id: 2,
      type: "volunteer",
      title: "Volunteer Program Penanaman",
      date: "22 Juni 2024",
      participants: 200,
      photo: "🌱",
      description: "Berhasil menanam 1000 pohon untuk penghijauan",
    },
    {
      id: 3,
      type: "workshop",
      title: "Workshop Komposting Sukses",
      date: "20 Juni 2024",
      participants: 75,
      photo: "📚",
      description:
        "Peserta berhasil membuat kompos berkualitas dari bahan organik",
    },
  ];

  const testimonials = [
    {
      name: "Ibu Siti",
      role: "Peserta Komunitas",
      quote:
        "Komunitas IFK sangat membantu saya memahami pentingnya ekonomi sirkular dan sampah organik",
      avatar: "👩‍🌾",
    },
    {
      name: "Pak Budi",
      role: "Volunteer Aktif",
      quote:
        "Semangat komunitas IFK luar biasa, saya bangga berkontribusi pada masa depan yang lebih hijau",
      avatar: "👨‍🌾",
    },
    {
      name: "Dewi Lestari",
      role: "Event Organizer",
      quote:
        "Setiap acara komunitas IFK selalu penuh antusiasme dan dampak nyata untuk lingkungan",
      avatar: "👩‍💼",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary mb-4">
              Komunitas IFK 👥
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas petani modern yang peduli pada
              keberlanjutan dan ekonomi sirkular
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {["events", "workshops", "activities", "testimonials"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-semibold transition-colors border-b-2 ${
                    activeTab === tab
                      ? "text-primary border-primary"
                      : "text-foreground/60 border-transparent hover:text-primary"
                  }`}
                >
                  {tab === "events" && "Event"}
                  {tab === "workshops" && "Workshop"}
                  {tab === "activities" && "Aktivitas"}
                  {tab === "testimonials" && "Testimonial"}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
                Event Komunitas
              </h2>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="card-hover glass-effect rounded-2xl p-8 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                    {/* Image */}
                    <div className="text-6xl text-center group-hover:scale-110 transition-transform">
                      {event.image}
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3">
                      <h3 className="text-2xl font-poppins font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.participants} Peserta</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <button className="btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        Daftar
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                        <Heart className="w-5 h-5 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Workshops Tab */}
          {activeTab === "workshops" && (
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
                Workshop & Pelatihan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="card-hover glass-effect rounded-2xl p-6 group flex flex-col h-full"
                  >
                    <div className="text-5xl mb-4">{workshop.icon}</div>
                    <h3 className="text-xl font-poppins font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                      {workshop.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4 flex-1">
                      {workshop.description}
                    </p>
                    <div className="space-y-2 text-sm text-foreground/70 mb-4 border-t pt-4">
                      <p>👨‍🏫 Mentor: {workshop.mentor}</p>
                      <p>📅 Dimulai: {workshop.date}</p>
                      <p>⏱️ Durasi: {workshop.duration}</p>
                      <p>👥 {workshop.participants} Peserta</p>
                    </div>
                    <button className="w-full btn-primary text-sm py-2">
                      Daftar Sekarang
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
                Aktivitas Terbaru
              </h2>
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="glass-effect rounded-2xl p-6 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    <div className="text-6xl text-center group-hover:scale-110 transition-transform">
                      {activity.photo}
                    </div>
                    <div className="md:col-span-4">
                      <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-2">
                        {activity.type === "event" && "Event"}
                        {activity.type === "volunteer" && "Volunteer"}
                        {activity.type === "workshop" && "Workshop"}
                      </div>
                      <h3 className="text-xl font-poppins font-bold text-secondary mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-foreground/70 mb-3">
                        {activity.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-foreground/70">
                        <span>📅 {activity.date}</span>
                        <span>👥 {activity.participants} Peserta</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
                Testimoni Komunitas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="card-hover glass-effect rounded-2xl p-6 group"
                  >
                    <div className="text-5xl mb-4">{testimonial.avatar}</div>
                    <p className="text-foreground/70 italic mb-6 line-clamp-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-secondary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-500">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 overflow-hidden bg-white border-t">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 opacity-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
            Bergabunglah Dengan Komunitas IFK
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari gerakan petani modern yang peduli pada
            keberlanjutan
          </p>
          <button className="btn-primary inline-flex items-center justify-center gap-2">
            Daftar Komunitas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
