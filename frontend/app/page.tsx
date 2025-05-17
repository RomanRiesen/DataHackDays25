"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Enhanced sample data with multiple years and time gaps
const sampleData = {
  q: "wolf",
  answers: [
    // 2023 data
    {
      type: "speech",
      score: "0.15",
      votum_uid: "7d9fa829-040c-4789-bbca-f38366036468",
      votum_mitglied: "Reto Müller",
      votum_startzeit: "2023-03-15 10:41:00.324",
      votum_text: "Speech content about environmental policies.",
      "Übersicht vom": "2023-03-15 10:30",
      name: "Reto Müller",
      gemeinde: "Langenthal",
      partei: "SP",
    },
    {
      type: "motion",
      score: "0.22",
      votum_uid: "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
      votum_mitglied: "Hanspeter Steiner",
      votum_startzeit: "2023-03-15 11:44:02.047",
      votum_text: "Motion about wildlife protection zones.",
      "Übersicht vom": "2023-03-15 11:30",
      name: "Hanspeter Steiner",
      gemeinde: "Boll",
      partei: "EVP",
      passed: "true",
    },
    {
      type: "motion",
      score: "0.18",
      votum_uid: "5fd27c00-c0ae-4e3d-911f-32114d3a0f8e",
      votum_mitglied: "Anna Schmidt",
      votum_startzeit: "2023-05-22 09:15:02.047",
      votum_text: "Motion regarding wolf population control measures.",
      "Übersicht vom": "2023-05-22 09:15",
      name: "Anna Schmidt",
      gemeinde: "Bern",
      partei: "SVP",
      passed: "false",
    },

    // 2023 - Fall session
    {
      type: "speech",
      score: "0.11",
      votum_uid: "7d9fa829-040c-4789-bbca-f38366036469",
      votum_mitglied: "Thomas Weber",
      votum_startzeit: "2023-09-05 14:21:00.324",
      votum_text: "Speech discussing agricultural challenges with predators.",
      "Übersicht vom": "2023-09-05 14:20",
      name: "Thomas Weber",
      gemeinde: "Thun",
      partei: "FDP",
    },
    {
      type: "motion",
      score: "0.25",
      votum_uid: "6fd27c00-c0ae-4e3d-911f-32114d3a0f8f",
      votum_mitglied: "Maria Brunner",
      votum_startzeit: "2023-09-05 15:30:02.047",
      votum_text: "Motion proposing revisions to the wildlife management regulations.",
      "Übersicht vom": "2023-09-05 15:30",
      name: "Maria Brunner",
      gemeinde: "Interlaken",
      partei: "GLP",
      passed: "unresolved",
    },

    // 2024 data - Early year (note the gap between Sept 2023 and March 2024)
    {
      type: "speech",
      score: "0.19",
      votum_uid: "8d9fa829-040c-4789-bbca-f38366036470",
      votum_mitglied: "Peter Schneider",
      votum_startzeit: "2024-03-12 09:30:00.324",
      votum_text: "Speech about the winter impact on wildlife.",
      "Übersicht vom": "2024-03-12 09:30",
      name: "Peter Schneider",
      gemeinde: "Spiez",
      partei: "SP",
    },
    {
      type: "motion",
      score: "0.21",
      votum_uid: "7fd27c00-c0ae-4e3d-911f-32114d3a0f90",
      votum_mitglied: "Sarah Keller",
      votum_startzeit: "2024-03-12 11:15:02.047",
      votum_text: "Motion for additional funding for wildlife monitoring.",
      "Übersicht vom": "2024-03-12 11:15",
      name: "Sarah Keller",
      gemeinde: "Köniz",
      partei: "Grüne",
      passed: "true",
    },

    // 2024 data - Summer (several items on same day)
    {
      type: "speech",
      score: "0.23",
      votum_uid: "9d9fa829-040c-4789-bbca-f38366036471",
      votum_mitglied: "Christine Meier",
      votum_startzeit: "2024-06-18 10:00:00.324",
      votum_text: "Speech addressing farmer concerns about livestock predation.",
      "Übersicht vom": "2024-06-18 10:00",
      name: "Christine Meier",
      gemeinde: "Meiringen",
      partei: "SVP",
    },
    {
      type: "speech",
      score: "0.17",
      votum_uid: "1d9fa829-040c-4789-bbca-f38366036472",
      votum_mitglied: "Martin Gerber",
      votum_startzeit: "2024-06-18 10:45:00.324",
      votum_text: "Response to concerns about wolf sightings near residential areas.",
      "Übersicht vom": "2024-06-18 10:45",
      name: "Martin Gerber",
      gemeinde: "Steffisburg",
      partei: "FDP",
    },
    {
      type: "motion",
      score: "0.28",
      votum_uid: "8fd27c00-c0ae-4e3d-911f-32114d3a0f91",
      votum_mitglied: "Laura Huber",
      votum_startzeit: "2024-06-18 14:30:02.047",
      votum_text: "Motion for establishing clear guidelines for wolf management in the canton.",
      "Übersicht vom": "2024-06-18 14:30",
      name: "Laura Huber",
      gemeinde: "Burgdorf",
      partei: "SP",
      passed: "true",
    },
    {
      type: "motion",
      score: "0.16",
      votum_uid: "9fd27c00-c0ae-4e3d-911f-32114d3a0f92",
      votum_mitglied: "Daniel Zimmermann",
      votum_startzeit: "2024-06-18 15:45:02.047",
      votum_text: "Counter-motion regarding balance between wildlife protection and agricultural interests.",
      "Übersicht vom": "2024-06-18 15:45",
      name: "Daniel Zimmermann",
      gemeinde: "Biel",
      partei: "SVP",
      passed: "false",
    },

    // 2024 data - December
    {
      type: "speech",
      score: "0.14",
      votum_uid: "2d9fa829-040c-4789-bbca-f38366036473",
      votum_mitglied: "Silvia Berger",
      votum_startzeit: "2024-12-10 09:15:00.324",
      votum_text: "Year-end summary of wildlife management initiatives.",
      "Übersicht vom": "2024-12-10 09:15",
      name: "Silvia Berger",
      gemeinde: "Thun",
      partei: "Grüne",
    },
    {
      type: "motion",
      score: "0.26",
      votum_uid: "1fd27c00-c0ae-4e3d-911f-32114d3a0f93",
      votum_mitglied: "Michael Wagner",
      votum_startzeit: "2024-12-10 11:00:02.047",
      votum_text: "Motion for a review of the annual wolf monitoring program.",
      "Übersicht vom": "2024-12-10 11:00",
      name: "Michael Wagner",
      gemeinde: "Langnau",
      partei: "EVP",
      passed: "unresolved",
    },

    // Original 2025 data
    {
      type: "speech",
      score: "0.2",
      votum_uid: "7d9fa829-040c-4789-bbca-f38366036468",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b22",
      element_nummer: 42,
      votum_mitglied: "Reto Müller",
      mitglied_uid: "cffee9e3317441ed9ce9f6a86a58a59d",
      votum_startzeit: "2024-12-03 09:41:00.324",
      votum_text:
        "Einzelsprecher. <i>(Grossrat Müller wendet sich an Grossrätin Bossard-Jenni.\xa0/ Le député Müller s'adresse à la députée Bossard-Jenni.)</i> Du kannst mir sonst dein Zitat geben; ich hätte vielleicht am Schluss noch ein bisschen Zeit, um es zu verlesen.<p>Ich möchte sagen, dass es hier in diesem Saal Leute gibt, die damals schon dabei waren. Ich gehöre auch dazu. Ich kam 2013 in diesen Rat, und ich möchte Ihnen einfach in Erinnerung rufen, insbesondere jenen, die nicht an diesem Kompromiss geschmiedet haben: Es war ein hartes Ringen damals. Man hat sich das nicht leicht gemacht. Man hat nicht einfach gesagt: «Ja, dann verschieben wir diese Schulen ein bisschen dahin und ein bisschen dorthin.» Es war wirklich auch eine Kröte, die wir aus den Regionen Oberaargau und Emmental schlucken mussten. Burgdorf gab die TF nicht einfach so mir nichts, dir nichts ab. Herr Pulver machte damals einen sehr guten Job, aber noch heute muss man sagen: Es war das kleinste gemeinsame Vielfache\xa0– das kleinste!\xa0– und nicht irgendwie der grösste gemeinsame Teiler, den es gibt, sondern wirklich das kleinste Machbare, das man sich damals politisch vorstellen konnte.<p>Gegenüber denjenigen, die <i>vor</i> Ihnen hier auf diesen Stühlen sassen, muss man schon auch sagen: Bitte würdigen Sie mit entsprechendem Respekt, was sich diese Leute damals überlegt haben. Natürlich: «Der Kopf ist rund, damit das Denken seine Richtung ändern kann», sagte Regierungsrat Käser anno dazumal immer, aber trotzdem ist nicht alles, was man früher aus Gründen entschied, per se schlecht.<p>Ausserdem wird uns immer wieder gesagt: «Liebe Oberaargauer, liebe Emmentaler, schauen Sie dies nicht wirklich als regionalen Entscheid an, sondern als gesamtkantonalen.» Aber ich muss Sie schon auf etwas hinweisen: auf den Eindruck, dass auf der Achse Thun–Bern–Biel oder darüber hinaus\xa0– bis nach Tavannes oder bis nach Interlaken\xa0– ein Projekt so viel kosten darf, wie es nur geht. Wir sprechen hier Nachkredit um Nachkredit für Dinge, die in Interlaken im Boden versaufen und in Tavannes unbrauchbar gekauft werden. Es ist nicht ganz zu negieren, dass man hier auf dieser Nord-Süd-Achse wirklich auch Respekt haben und dort auch investieren muss.<p>Heute werden jetzt schon wieder Luftschlösser gebaut: «Ja, Burgdorf, sei jetzt noch ein bisschen ruhig, wir geben dir dann schon irgendwie eine Schule für Gestaltung» oder Weiss-der-Hund-was, eine dieser 67 fehlenden Gymnasialklassen, und dann ist wieder gut. Das ist aber nicht mehr als ein Luftschloss, zum heutigen Zeitpunkt. Und dieses ewige Vertröstetwerden\xa0– dort, wo wir eben sind\xa0–, sei das beim Waldhof oder sei es in diesem Fall hier, geht für uns einfach irgendeinmal nicht mehr auf.<p>Also, noch das Zitat: «Politische Strategien sind nicht das Papier wert.» Das wäre noch das Zitat von Frau Bossard gewesen.",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b22",
      "Übersicht vom": "2025-05-16 14:30",
      name: "Reto Müller",
      gemeinde: "Langenthal",
      partei: "SP",
    },
    {
      type: "speech",
      score: "0.01",
      votum_uid: "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b24",
      element_nummer: 43,
      votum_mitglied: "Hanspeter Steiner",
      mitglied_uid: "0a36576df3834e9d8d6df6689fc5734b",
      votum_startzeit: "2024-12-03 09:44:02.047",
      votum_text:
        "Einzelsprecher. Ich bin nach vorne gekommen, weil noch keine Sparvorschläge gemacht worden sind. Die Schule für Gestaltung ist in Deisswil, wenn ich richtig informiert bin, für 10\xa0Jahre eingemietet. Ich gehe davon aus, dass man dort einen Vertrag gemacht hat. Man hat dort eigentlich einen nackten Raum gemietet, den man so gestaltet, dass man die Schule für Gestaltung dort 10\xa0Jahre lang betreiben kann. Wenn man diesen Vertrag jetzt künden oder die Schule früher wieder herausnehmen sollte, wären diese Investitionen\xa0– ich muss es heute so sagen\xa0– ein weiteres Mal in den Dreck gesetzt.<p>Und längerfristig kann ich Ihnen schon Sparvorschläge aufzeigen, nämlich auch verkehrstechnische Sparvorschläge: Wenn unsere Züge, die RBS im Worblental von Worb nach Bern, jeden Morgen einseitig überfüllt und in der Gegenrichtung leer sind, und wenn die Züge von Burgdorf in Richtung Bern\xa0– ich höre immer wieder Klagen\xa0– überfüllt sind und man stehen muss, sie aber in der Gegenrichtung leer sind, könnten wir langfristig verkehrspolitisch Entscheide fällen, indem man vielleicht auch gewisse dezentrale Standorte fördern würde, damit wir diesbezüglich auch verkehrspolitisch mal eine Korrektur machen könnten.<p>Vielen Dank, wenn Sie der Planungserklärung Bärtschi nicht zustimmen, aber dafür die Planungserklärung Rothenbühler annehmen. Merci.",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
      "Übersicht vom": "2025-05-18 16:30",
      name: "Hanspeter Steiner",
      gemeinde: "Boll",
      partei: "EVP",
    },
    {
      type: "speech",
      score: "0.1",
      votum_uid: "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b24",
      element_nummer: 43,
      votum_mitglied: "Hanspeter Steiner",
      mitglied_uid: "0a36576df3834e9d8d6df6689fc5734b",
      votum_startzeit: "2024-12-03 09:44:02.047",
      votum_text:
        "Einzelsprecher. Ich bin nach vorne gekommen, weil noch keine Sparvorschläge gemacht worden sind. Die Schule für Gestaltung ist in Deisswil, wenn ich richtig informiert bin, für 10\xa0Jahre eingemietet. Ich gehe davon aus, dass man dort einen Vertrag gemacht hat. Man hat dort eigentlich einen nackten Raum gemietet, den man so gestaltet, dass man die Schule für Gestaltung dort 10\xa0Jahre lang betreiben kann. Wenn man diesen Vertrag jetzt künden oder die Schule früher wieder herausnehmen sollte, wären diese Investitionen\xa0– ich muss es heute so sagen\xa0– ein weiteres Mal in den Dreck gesetzt.<p>Und längerfristig kann ich Ihnen schon Sparvorschläge aufzeigen, nämlich auch verkehrstechnische Sparvorschläge: Wenn unsere Züge, die RBS im Worblental von Worb nach Bern, jeden Morgen einseitig überfüllt und in der Gegenrichtung leer sind, und wenn die Züge von Burgdorf in Richtung Bern\xa0– ich höre immer wieder Klagen\xa0– überfüllt sind und man stehen muss, sie aber in der Gegenrichtung leer sind, könnten wir langfristig verkehrspolitisch Entscheide fällen, indem man vielleicht auch gewisse dezentrale Standorte fördern würde, damit wir diesbezüglich auch verkehrspolitisch mal eine Korrektur machen könnten.<p>Vielen Dank, wenn Sie der Planungserklärung Bärtschi nicht zustimmen, aber dafür die Planungserklärung Rothenbühler annehmen. Merci.",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
      "Übersicht vom": "2025-05-16 13:30",
      name: "Hanspeter Steiner",
      gemeinde: "Boll",
      partei: "EVP",
    },
    {
      type: "motion",
      score: "0.1",
      votum_uid: "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b24",
      element_nummer: 43,
      motion: "Hanspeter Steiner",
      mitglied_uid: "0a36576df3834e9d8d6df6689fc5734b",
      votum_startzeit: "2024-12-03 09:44:02.047",
      votum_text: "motion_content",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
      "Übersicht vom": "2025-05-15 12:30",
      name: "Hanspeter Steiner",
      gemeinde: "Boll",
      partei: "EVP",
      passed: "true",
    },
    {
      type: "motion",
      score: "0.08",
      votum_uid: "5fd27c00-c0ae-4e3d-911f-32114d3a0f8e",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b25",
      element_nummer: 44,
      motion: "Anna Schmidt",
      mitglied_uid: "1a36576df3834e9d8d6df6689fc5734c",
      votum_startzeit: "2024-12-03 10:15:02.047",
      votum_text: "another_motion_content",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b25",
      "Übersicht vom": "2025-05-15 12:30",
      name: "Anna Schmidt",
      gemeinde: "Bern",
      partei: "SVP",
      passed: "false",
    },
    {
      type: "motion",
      score: "0.05",
      votum_uid: "6fd27c00-c0ae-4e3d-911f-32114d3a0f8f",
      traktandum_uid: "7974df5e483a4a4e82dbb469cb04d048",
      element_id: "674f141abb90b13428f09b26",
      element_nummer: 45,
      motion: "Thomas Weber",
      mitglied_uid: "2a36576df3834e9d8d6df6689fc5734d",
      votum_startzeit: "2024-12-03 11:30:02.047",
      votum_text: "third_motion_content",
      votum_url:
        "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b26",
      "Übersicht vom": "2025-05-16 13:30",
      name: "Thomas Weber",
      gemeinde: "Thun",
      partei: "FDP",
      passed: "unresolved",
    },

    // 2025 data - Fall session
    {
      type: "speech",
      score: "0.13",
      votum_uid: "3d9fa829-040c-4789-bbca-f38366036474",
      votum_mitglied: "Johannes Bauer",
      votum_startzeit: "2025-09-10 10:30:00.324",
      votum_text: "Discussion of the annual wildlife report focusing on wolf populations.",
      "Übersicht vom": "2025-09-10 10:30",
      name: "Johannes Bauer",
      gemeinde: "Meiringen",
      partei: "SVP",
    },

    // 2026 data - Spring
    {
      type: "motion",
      score: "0.27",
      votum_uid: "2fd27c00-c0ae-4e3d-911f-32114d3a0f94",
      votum_mitglied: "Elisabeth Moser",
      votum_startzeit: "2026-03-20 09:30:02.047",
      votum_text: "Motion for implementing improved livestock protection measures.",
      "Übersicht vom": "2026-03-20 09:30",
      name: "Elisabeth Moser",
      gemeinde: "Worb",
      partei: "GLP",
      passed: "true",
    },
    {
      type: "speech",
      score: "0.12",
      votum_uid: "4d9fa829-040c-4789-bbca-f38366036475",
      votum_mitglied: "Robert Schwarz",
      votum_startzeit: "2026-03-20 11:00:00.324",
      votum_text: "Response to the motion regarding livestock protection from wolves.",
      "Übersicht vom": "2026-03-20 11:00",
      name: "Robert Schwarz",
      gemeinde: "Oberhofen",
      partei: "Grüne",
    },

    // 2026 data - Summer
    {
      type: "motion",
      score: "0.24",
      votum_uid: "3fd27c00-c0ae-4e3d-911f-32114d3a0f95",
      votum_mitglied: "Claudia Fischer",
      votum_startzeit: "2026-06-15 13:45:02.047",
      votum_text: "Motion proposing updated framework for wildlife conservation.",
      "Übersicht vom": "2026-06-15 13:45",
      name: "Claudia Fischer",
      gemeinde: "Thun",
      partei: "SP",
      passed: "unresolved",
    },
  ],
}

// Define color scheme
const colors = {
  black: "rgba(0, 0, 0, 0.8)",
  gold: "rgba(255, 215, 48, 0.8)", // #FFD730
  red: "rgba(232, 66, 63, 0.8)", // #E8423F
  gray: "rgba(108, 117, 125, 0.8)",
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("wolf")
  const [searchInput, setSearchInput] = useState<string>("wolf")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any>(sampleData)
  const [chartData, setChartData] = useState<any>(null)
  const [summary, setSummary] = useState<any[]>([])
  const [motionStatusSummary, setMotionStatusSummary] = useState<any>({
    passed: 0,
    failed: 0,
    unresolved: 0,
  })
  const [timeRange, setTimeRange] = useState<{ start: string; end: string }>({ start: "", end: "" })

  // Function to handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setSearchQuery(searchInput)

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, you would fetch data from an API here
      // For now, we'll just use our sample data
      setSearchResults({
        ...sampleData,
        q: searchInput,
      })
      setIsSearching(false)
    }, 800)
  }

  // Function to group data by month and year with trimmed empty months
  const groupByMonthYear = (data: any[]) => {
    // First, collect all months with data
    const monthsWithData = new Set<string>()
    const monthData: Record<
      string,
      {
        speech: number
        motionPassed: number
        motionFailed: number
        motionUnresolved: number
      }
    > = {}

    let minDate = new Date("9999-12-31")
    let maxDate = new Date("1000-01-01")

    // Process all data points to find months with actual data
    data.forEach((item: any) => {
      const dateParts = item["Übersicht vom"].split(" ")[0].split("-")
      const year = Number(dateParts[0])
      const month = Number(dateParts[1])
      const itemDate = new Date(year, month - 1, Number(dateParts[2]))
      const dateKey = `${year}-${String(month).padStart(2, "0")}`

      if (itemDate < minDate) minDate = itemDate
      if (itemDate > maxDate) maxDate = itemDate

      monthsWithData.add(dateKey)

      if (!monthData[dateKey]) {
        monthData[dateKey] = {
          speech: 0,
          motionPassed: 0,
          motionFailed: 0,
          motionUnresolved: 0,
        }
      }

      const type = item.type as string

      if (type === "speech") {
        monthData[dateKey].speech++
      } else if (type === "motion") {
        // Check the passed status
        if (item.passed === "true") {
          monthData[dateKey].motionPassed++
        } else if (item.passed === "false") {
          monthData[dateKey].motionFailed++
        } else {
          // Default to unresolved if not specified or is "unresolved"
          monthData[dateKey].motionUnresolved++
        }
      }
    })

    // Find the first and last months with data
    const sortedMonthsWithData = Array.from(monthsWithData).sort()
    const firstMonthWithData = sortedMonthsWithData[0]
    const lastMonthWithData = sortedMonthsWithData[sortedMonthsWithData.length - 1]

    // Parse first and last months
    const [firstYear, firstMonth] = firstMonthWithData.split("-").map(Number)
    const [lastYear, lastMonth] = lastMonthWithData.split("-").map(Number)

    // Calculate one month before and one month after
    let beforeYear = firstYear
    let beforeMonth = firstMonth - 1
    if (beforeMonth === 0) {
      beforeYear--
      beforeMonth = 12
    }

    let afterYear = lastYear
    let afterMonth = lastMonth + 1
    if (afterMonth === 13) {
      afterYear++
      afterMonth = 1
    }

    const beforeKey = `${beforeYear}-${String(beforeMonth).padStart(2, "0")}`
    const afterKey = `${afterYear}-${String(afterMonth).padStart(2, "0")}`

    // Create the final grouped data with at most one empty month on each end
    const grouped: Record<
      string,
      {
        speech: number
        motionPassed: number
        motionFailed: number
        motionUnresolved: number
      }
    > = {}

    // Add the month before if it doesn't have data
    if (!monthsWithData.has(beforeKey)) {
      grouped[beforeKey] = {
        speech: 0,
        motionPassed: 0,
        motionFailed: 0,
        motionUnresolved: 0,
      }
    }

    // Add all months with data
    sortedMonthsWithData.forEach((month) => {
      grouped[month] = monthData[month]
    })

    // Add the month after if it doesn't have data
    if (!monthsWithData.has(afterKey)) {
      grouped[afterKey] = {
        speech: 0,
        motionPassed: 0,
        motionFailed: 0,
        motionUnresolved: 0,
      }
    }

    // Calculate totals for motion status summary
    let totalPassed = 0
    let totalFailed = 0
    let totalUnresolved = 0

    Object.values(monthData).forEach((month) => {
      totalPassed += month.motionPassed
      totalFailed += month.motionFailed
      totalUnresolved += month.motionUnresolved
    })

    setMotionStatusSummary({
      passed: totalPassed,
      failed: totalFailed,
      unresolved: totalUnresolved,
    })

    // Set the time range for display
    setTimeRange({
      start: `${firstYear}-${String(firstMonth).padStart(2, "0")}`,
      end: `${lastYear}-${String(lastMonth).padStart(2, "0")}`,
    })

    return grouped
  }

  useEffect(() => {
    if (!searchResults) return

    // Process the data by month and year with trimmed empty months
    const groupedData = groupByMonthYear(searchResults.answers)

    // Sort dates chronologically
    const sortedDates = Object.keys(groupedData).sort()

    // Format dates for display (YYYY-MM to MMM YYYY)
    const formatMonthYear = (dateStr: string) => {
      const [year, month] = dateStr.split("-")
      const date = new Date(Number(year), Number(month) - 1, 1)
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    }

    // Prepare data for the chart with new color scheme
    const data = {
      labels: sortedDates.map(formatMonthYear),
      datasets: [
        {
          label: "Speeches",
          data: sortedDates.map((date) => groupedData[date].speech),
          backgroundColor: colors.black,
          stack: "Stack 0",
        },
        {
          label: "Motions (Passed)",
          data: sortedDates.map((date) => groupedData[date].motionPassed),
          backgroundColor: colors.gold,
          stack: "Stack 1",
        },
        {
          label: "Motions (Failed)",
          data: sortedDates.map((date) => groupedData[date].motionFailed),
          backgroundColor: colors.red,
          stack: "Stack 1",
        },
        {
          label: "Motions (Unresolved)",
          data: sortedDates.map((date) => groupedData[date].motionUnresolved),
          backgroundColor: colors.gray,
          stack: "Stack 1",
        },
      ],
    }

    setChartData(data)

    // Create summary data
    const summaryData = sortedDates.map((date) => ({
      date: formatMonthYear(date),
      rawDate: date,
      speeches: groupedData[date].speech,
      motionsPassed: groupedData[date].motionPassed,
      motionsFailed: groupedData[date].motionFailed,
      motionsUnresolved: groupedData[date].motionUnresolved,
      totalMotions:
        groupedData[date].motionPassed + groupedData[date].motionFailed + groupedData[date].motionUnresolved,
      totalItems:
        groupedData[date].speech +
        groupedData[date].motionPassed +
        groupedData[date].motionFailed +
        groupedData[date].motionUnresolved,
    }))

    setSummary(summaryData)
  }, [searchResults])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Histogram of Speeches and Motions by Month/Year",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || ""
            const value = context.raw || 0
            return `${label}: ${value}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Month/Year",
        },
      },
    },
  }

  // Calculate totals
  const totalSpeeches = summary.reduce((sum, item) => sum + item.speeches, 0)
  const totalMotions = summary.reduce((sum, item) => sum + item.totalMotions, 0)

  // Calculate number of months with data vs. total months in range
  const monthsWithData = summary.filter((item) => item.totalItems > 0).length
  const totalMonths = summary.length

  // Helper function to get type badge color based on item type and status
  const getTypeBadgeColor = (item: any) => {
    if (item.type === "speech") {
      return "bg-black text-white" // Black for speeches
    } else if (item.type === "motion") {
      if (item.passed === "true") {
        return "bg-[#FFD730] text-black" // Gold for passed motions
      } else if (item.passed === "false") {
        return "bg-[#E8423F] text-white" // Red for failed motions
      } else {
        return "bg-[#6C757D] text-white" // Gray for unresolved motions
      }
    }
    return "bg-black text-white" // Default
  }

  return (
    <div className="container mx-auto py-8 bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">Parliamentary Speech Search</h1>
        <p className="text-center text-gray-600 mb-6">Search for speeches and motions in the parliamentary database</p>

        <Card className="mb-8 shadow-sm">
          <CardHeader className="border-b border-black">
            <CardTitle className="text-black">Search</CardTitle>
            <CardDescription>Enter keywords to search for speeches and motions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Enter search terms..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pr-12 border-black rounded-full"
              />
              <Button
                type="submit"
                disabled={isSearching}
                className="absolute right-0 top-0 h-full rounded-full rounded-l-none bg-black hover:bg-gray-800 text-white"
              >
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {searchResults && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-black">
              <CardHeader className="pb-2 border-b border-black">
                <CardTitle className="text-black">Total Speeches</CardTitle>
                <CardDescription>Number of speeches in the results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-black">{totalSpeeches}</p>
              </CardContent>
            </Card>

            <Card className="border-black">
              <CardHeader className="pb-2 border-b border-black">
                <CardTitle className="text-black">Total Motions</CardTitle>
                <CardDescription>Number of motions in the results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-black">{totalMotions}</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#FFD730] mb-1"></div>
                    <span className="text-xs text-center">Passed: {motionStatusSummary.passed}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#E8423F] mb-1"></div>
                    <span className="text-xs text-center">Failed: {motionStatusSummary.failed}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#6C757D] mb-1"></div>
                    <span className="text-xs text-center">Unresolved: {motionStatusSummary.unresolved}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black">
              <CardHeader className="pb-2 border-b border-black">
                <CardTitle className="text-black">Total Items</CardTitle>
                <CardDescription>Combined speeches and motions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-black">{totalSpeeches + totalMotions}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Coverage: {Math.round((monthsWithData / totalMonths) * 100)}% of displayed months
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle className="text-black">Histogram of Speeches and Motions</CardTitle>
              <CardDescription>Distribution by month with motion status</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData ? (
                <div className="h-[500px]">
                  <Bar options={options} data={chartData} />
                </div>
              ) : (
                <p>Loading chart data...</p>
              )}
            </CardContent>
          </Card>

          <div className="py-6 px-4 bg-gray-200 mb-8 rounded-none">
            <h2 className="text-2xl font-semibold mb-2 text-black">Results for: "{searchQuery}"</h2>
            <p className="text-gray-600">
              Found {searchResults.answers.length} results spanning from {timeRange.start} to {timeRange.end}
            </p>
            <p className="text-gray-600 mt-1">
              Data available for {monthsWithData} out of {totalMonths} months in the displayed range
            </p>
          </div>

          <Card className="mb-8 border-black">
            <CardHeader className="border-b border-black">
              <CardTitle className="text-black">Items by Relevance</CardTitle>
              <CardDescription>Individual speeches and motions sorted by relevance score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Speaker</th>
                      <th className="text-left py-2 px-4 bg-[rgba(0,0,0,0.03)]">Party</th>
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-center py-2 px-4 bg-[rgba(0,0,0,0.03)]">Status</th>
                      <th className="text-center py-2 px-4 bg-[rgba(255,215,48,0.1)]">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.answers
                      .slice()
                      .sort((a, b) => Number.parseFloat(b.score) - Number.parseFloat(a.score))
                      .map((item, index) => (
                        <tr key={index} className="border-b border-gray-300 hover:bg-gray-50">
                          <td className="py-2 px-4">
                            <span className={`capitalize px-2 py-1 text-xs ${getTypeBadgeColor(item)}`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-2 px-4 font-medium">{item.name}</td>
                          <td className="py-2 px-4 bg-[rgba(0,0,0,0.03)]">{item.partei}</td>
                          <td className="py-2 px-4">{item["Übersicht vom"].split(" ")[0]}</td>
                          <td className="text-center py-2 px-4 bg-[rgba(0,0,0,0.03)]">
                            {item.type === "motion" && item.passed ? (
                              <span
                                className={`px-2 py-1 text-xs ${
                                  item.passed === "true"
                                    ? "bg-[#FFD730] text-black"
                                    : item.passed === "false"
                                      ? "bg-[#E8423F] text-white"
                                      : "bg-[#6C757D] text-white"
                                }`}
                              >
                                {item.passed === "true" ? "Passed" : item.passed === "false" ? "Failed" : "Unresolved"}
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="text-center py-2 px-4 bg-[rgba(255,215,48,0.1)]">
                            <span className="font-medium">{Number.parseFloat(item.score).toFixed(2)}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader className="border-b border-black">
              <CardTitle className="text-black">Search Results</CardTitle>
              <CardDescription>Individual speeches and motions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {searchResults.answers.map((item: any, index: number) => (
                  <div key={index} className="border border-black rounded-none p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-black">
                        {item.name} ({item.gemeinde}, {item.partei})
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`capitalize px-2 py-1 rounded-none ${getTypeBadgeColor(item)}`}>
                          {item.type}
                        </span>
                        {item.type === "motion" && item.passed && (
                          <span
                            className={`px-2 py-1 rounded-none ${
                              item.passed === "true"
                                ? "bg-[#FFD730] text-black"
                                : item.passed === "false"
                                  ? "bg-[#E8423F] text-white"
                                  : "bg-[#6C757D] text-white"
                            }`}
                          >
                            {item.passed === "true" ? "Passed" : item.passed === "false" ? "Failed" : "Unresolved"}
                          </span>
                        )}
                        <span>{item["Übersicht vom"]}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {item.votum_text && item.votum_text.length > 300
                        ? item.votum_text.substring(0, 300).replace(/<\/?[^>]+(>|$)/g, "") + "..."
                        : item.votum_text
                          ? item.votum_text.replace(/<\/?[^>]+(>|$)/g, "")
                          : "No text available"}
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Score: </span>
                      <span className="font-medium">{item.score}</span>
                    </div>
                    {item.votum_url && (
                      <a
                        href={item.votum_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-[#FFD730] hover:underline text-sm inline-block"
                      >
                        View original
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
