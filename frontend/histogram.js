import { createCanvas } from 'canvas';
import fs from 'fs';

// Parse the JSON data
const data = {
    "q": "wolf",
    "answers": [
        {
            "type": "speech",
            "score": "0.2",
            "votum_uid": "7d9fa829-040c-4789-bbca-f38366036468",
            "traktandum_uid": "7974df5e483a4a4e82dbb469cb04d048",
            "element_id": "674f141abb90b13428f09b22",
            "element_nummer": 42,
            "votum_mitglied": "Reto Müller",
            "mitglied_uid": "cffee9e3317441ed9ce9f6a86a58a59d",
            "votum_startzeit": "2024-12-03 09:41:00.324",
            "votum_text": "Einzelsprecher. <i>(Grossrat Müller wendet sich an Grossrätin Bossard-Jenni.\xa0/ Le député Müller s'adresse à la députée Bossard-Jenni.)</i> Du kannst mir sonst dein Zitat geben; ich hätte vielleicht am Schluss noch ein bisschen Zeit, um es zu verlesen.<p>Ich möchte sagen, dass es hier in diesem Saal Leute gibt, die damals schon dabei waren. Ich gehöre auch dazu. Ich kam 2013 in diesen Rat, und ich möchte Ihnen einfach in Erinnerung rufen, insbesondere jenen, die nicht an diesem Kompromiss geschmiedet haben: Es war ein hartes Ringen damals. Man hat sich das nicht leicht gemacht. Man hat nicht einfach gesagt: «Ja, dann verschieben wir diese Schulen ein bisschen dahin und ein bisschen dorthin.» Es war wirklich auch eine Kröte, die wir aus den Regionen Oberaargau und Emmental schlucken mussten. Burgdorf gab die TF nicht einfach so mir nichts, dir nichts ab. Herr Pulver machte damals einen sehr guten Job, aber noch heute muss man sagen: Es war das kleinste gemeinsame Vielfache\xa0– das kleinste!\xa0– und nicht irgendwie der grösste gemeinsame Teiler, den es gibt, sondern wirklich das kleinste Machbare, das man sich damals politisch vorstellen konnte.<p>Gegenüber denjenigen, die <i>vor</i> Ihnen hier auf diesen Stühlen sassen, muss man schon auch sagen: Bitte würdigen Sie mit entsprechendem Respekt, was sich diese Leute damals überlegt haben. Natürlich: «Der Kopf ist rund, damit das Denken seine Richtung ändern kann», sagte Regierungsrat Käser anno dazumal immer, aber trotzdem ist nicht alles, was man früher aus Gründen entschied, per se schlecht.<p>Ausserdem wird uns immer wieder gesagt: «Liebe Oberaargauer, liebe Emmentaler, schauen Sie dies nicht wirklich als regionalen Entscheid an, sondern als gesamtkantonalen.» Aber ich muss Sie schon auf etwas hinweisen: auf den Eindruck, dass auf der Achse Thun–Bern–Biel oder darüber hinaus\xa0– bis nach Tavannes oder bis nach Interlaken\xa0– ein Projekt so viel kosten darf, wie es nur geht. Wir sprechen hier Nachkredit um Nachkredit für Dinge, die in Interlaken im Boden versaufen und in Tavannes unbrauchbar gekauft werden. Es ist nicht ganz zu negieren, dass man hier auf dieser Nord-Süd-Achse wirklich auch Respekt haben und dort auch investieren muss.<p>Heute werden jetzt schon wieder Luftschlösser gebaut: «Ja, Burgdorf, sei jetzt noch ein bisschen ruhig, wir geben dir dann schon irgendwie eine Schule für Gestaltung» oder Weiss-der-Hund-was, eine dieser 67 fehlenden Gymnasialklassen, und dann ist wieder gut. Das ist aber nicht mehr als ein Luftschloss, zum heutigen Zeitpunkt. Und dieses ewige Vertröstetwerden\xa0– dort, wo wir eben sind\xa0–, sei das beim Waldhof oder sei es in diesem Fall hier, geht für uns einfach irgendeinmal nicht mehr auf.<p>Also, noch das Zitat: «Politische Strategien sind nicht das Papier wert.» Das wäre noch das Zitat von Frau Bossard gewesen.",
            "votum_url": "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b22",
            "uebersicht_vom": "2025-05-16 14:30",
            "name": "Reto Müller",
            "gemeinde": "Langenthal",
            "partei": "SP"
        },
        {
            "type": "speech",
            "score": "0.01",
            "votum_uid": "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
            "traktandum_uid": "7974df5e483a4a4e82dbb469cb04d048",
            "element_id": "674f141abb90b13428f09b24",
            "element_nummer": 43,
            "votum_mitglied": "Hanspeter Steiner",
            "mitglied_uid": "0a36576df3834e9d8d6df6689fc5734b",
            "votum_startzeit": "2024-12-03 09:44:02.047",
            "votum_text": "Einzelsprecher. Ich bin nach vorne gekommen, weil noch keine Sparvorschläge gemacht worden sind. Die Schule für Gestaltung ist in Deisswil, wenn ich richtig informiert bin, für 10\xa0Jahre eingemietet. Ich gehe davon aus, dass man dort einen Vertrag gemacht hat. Man hat dort eigentlich einen nackten Raum gemietet, den man so gestaltet, dass man die Schule für Gestaltung dort 10\xa0Jahre lang betreiben kann. Wenn man diesen Vertrag jetzt künden oder die Schule früher wieder herausnehmen sollte, wären diese Investitionen\xa0– ich muss es heute so sagen\xa0– ein weiteres Mal in den Dreck gesetzt.<p>Und längerfristig kann ich Ihnen schon Sparvorschläge aufzeigen, nämlich auch verkehrstechnische Sparvorschläge: Wenn unsere Züge, die RBS im Worblental von Worb nach Bern, jeden Morgen einseitig überfüllt und in der Gegenrichtung leer sind, und wenn die Züge von Burgdorf in Richtung Bern\xa0– ich höre immer wieder Klagen\xa0– überfüllt sind und man stehen muss, sie aber in der Gegenrichtung leer sind, könnten wir langfristig verkehrspolitisch Entscheide fällen, indem man vielleicht auch gewisse dezentrale Standorte fördern würde, damit wir diesbezüglich auch verkehrspolitisch mal eine Korrektur machen könnten.<p>Vielen Dank, wenn Sie der Planungserklärung Bärtschi nicht zustimmen, aber dafür die Planungserklärung Rothenbühler annehmen. Merci.",
            "votum_url": "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
            "uebersicht_vom": "2025-05-18 16:30",
            "name": "Hanspeter Steiner",
            "gemeinde": "Boll",
            "partei": "EVP"
        },
        {
            "type": "speech",
            "score": "0.1",
            "votum_uid": "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
            "traktandum_uid": "7974df5e483a4a4e82dbb469cb04d048",
            "element_id": "674f141abb90b13428f09b24",
            "element_nummer": 43,
            "votum_mitglied": "Hanspeter Steiner",
            "mitglied_uid": "0a36576df3834e9d8d6df6689fc5734b",
            "votum_startzeit": "2024-12-03 09:44:02.047",
            "votum_text": "Einzelsprecher. Ich bin nach vorne gekommen, weil noch keine Sparvorschläge gemacht worden sind. Die Schule für Gestaltung ist in Deisswil, wenn ich richtig informiert bin, für 10\xa0Jahre eingemietet. Ich gehe davon aus, dass man dort einen Vertrag gemacht hat. Man hat dort eigentlich einen nackten Raum gemietet, den man so gestaltet, dass man die Schule für Gestaltung dort 10\xa0Jahre lang betreiben kann. Wenn man diesen Vertrag jetzt künden oder die Schule früher wieder herausnehmen sollte, wären diese Investitionen\xa0– ich muss es heute so sagen\xa0– ein weiteres Mal in den Dreck gesetzt.<p>Und längerfristig kann ich Ihnen schon Sparvorschläge aufzeigen, nämlich auch verkehrstechnische Sparvorschläge: Wenn unsere Züge, die RBS im Worblental von Worb nach Bern, jeden Morgen einseitig überfüllt und in der Gegenrichtung leer sind, und wenn die Züge von Burgdorf in Richtung Bern\xa0– ich höre immer wieder Klagen\xa0– überfüllt sind und man stehen muss, sie aber in der Gegenrichtung leer sind, könnten wir langfristig verkehrspolitisch Entscheide fällen, indem man vielleicht auch gewisse dezentrale Standorte fördern würde, damit wir diesbezüglich auch verkehrspolitisch mal eine Korrektur machen könnten.<p>Vielen Dank, wenn Sie der Planungserklärung Bärtschi nicht zustimmen, aber dafür die Planungserklärung Rothenbühler annehmen. Merci.",
            "votum_url": "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
            "uebersicht_vom": "2025-05-16 13:30",
            "name": "Hanspeter Steiner",
            "gemeinde": "Boll",
            "partei": "EVP"
        },
        {
            "type": "motion",
            "score": "0.1",
            "votum_uid": "efd27c00-c0ae-4e3d-911f-32114d3a0f8d",
            "traktandum_uid": "7974df5e483a4a4e82dbb469cb04d048",
            "element_id": "674f141abb90b13428f09b24",
            "element_nummer": 43,
            "motion": "Hanspeter Steiner",
            "mitglied_uid": "0a36576df3834e9d8d6df6689fc5734b",
            "votum_startzeit": "2024-12-03 09:44:02.047",
            "votum_text": "motion_content",
            "votum_url": "https://www.tagblatt.gr.be.ch/shareparl?agendaItemUid=7974df5e483a4a4e82dbb469cb04d048&segmentUid=674f141abb90b13428f09b24",
            "uebersicht_vom": "2025-05-15 12:30",
            "name": "Hanspeter Steiner",
            "gemeinde": "Boll",
            "partei": "EVP"
        }
    ]
};

// Group the data by date and type
const groupedData = {};

data.answers.forEach(item => {
  const date = item["uebersicht_vom"].split(' ')[0]; // Extract just the date part
  const type = item.type;
  
  if (!groupedData[date]) {
    groupedData[date] = { speech: 0, motion: 0 };
  }
  
  groupedData[date][type]++;
});

// Sort dates chronologically
const sortedDates = Object.keys(groupedData).sort();

// Prepare data for the chart
const speechCounts = [];
const motionCounts = [];

sortedDates.forEach(date => {
  speechCounts.push(groupedData[date].speech);
  motionCounts.push(groupedData[date].motion);
});

// Create a canvas for the chart
const width = 800;
const height = 500;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);

// Draw chart title
ctx.fillStyle = 'black';
ctx.font = 'bold 20px Arial';
ctx.textAlign = 'center';
ctx.fillText('Histogram of Speeches and Motions by Date', width / 2, 30);

// Set up chart dimensions
const chartX = 80;
const chartY = 60;
const chartWidth = width - 120;
const chartHeight = height - 120;
const barWidth = chartWidth / sortedDates.length / 3;
const spacing = barWidth / 2;

// Draw axes
ctx.beginPath();
ctx.moveTo(chartX, chartY);
ctx.lineTo(chartX, chartY + chartHeight);
ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.stroke();

// Draw y-axis label
ctx.save();
ctx.translate(20, chartY + chartHeight / 2);
ctx.rotate(-Math.PI / 2);
ctx.textAlign = 'center';
ctx.font = '16px Arial';
ctx.fillText('Date', 0, 0);
ctx.restore();

// Draw x-axis label
ctx.textAlign = 'center';
ctx.font = '16px Arial';
ctx.fillText('Number of Items', chartX + chartWidth / 2, height - 20);

// Draw bars and x-axis labels
const maxCount = Math.max(...speechCounts, ...motionCounts);
const yScale = chartHeight / (maxCount + 1);

sortedDates.forEach((date, i) => {
  const x = chartX + (i * 3 * barWidth) + barWidth;
  
  // Draw speech bar
  const speechHeight = speechCounts[i] * yScale;
  ctx.fillStyle = 'rgba(54, 162, 235, 0.8)';
  ctx.fillRect(x, chartY + chartHeight - speechHeight, barWidth, speechHeight);
  
  // Draw motion bar
  const motionHeight = motionCounts[i] * yScale;
  ctx.fillStyle = 'rgba(255, 99, 132, 0.8)';
  ctx.fillRect(x + barWidth + spacing, chartY + chartHeight - motionHeight, barWidth, motionHeight);
  
  // Draw date label
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(date, x + barWidth / 2, chartY + chartHeight + 20);
});

// Draw y-axis ticks and labels
for (let i = 0; i <= maxCount; i++) {
  const y = chartY + chartHeight - (i * yScale);
  
  ctx.beginPath();
  ctx.moveTo(chartX - 5, y);
  ctx.lineTo(chartX, y);
  ctx.stroke();
  
  ctx.textAlign = 'right';
  ctx.fillText(i.toString(), chartX - 10, y + 5);
}

// Draw legend
const legendX = chartX + chartWidth - 150;
const legendY = chartY + 30;

// Speech legend
ctx.fillStyle = 'rgba(54, 162, 235, 0.8)';
ctx.fillRect(legendX, legendY, 20, 20);
ctx.fillStyle = 'black';
ctx.textAlign = 'left';
ctx.fillText('Speeches', legendX + 30, legendY + 15);

// Motion legend
ctx.fillStyle = 'rgba(255, 99, 132, 0.8)';
ctx.fillRect(legendX, legendY + 30, 20, 20);
ctx.fillStyle = 'black';
ctx.fillText('Motions', legendX + 30, legendY + 45);

// Print the data summary
console.log("Data Summary:");
console.log("=============");
console.log("Date\t\tSpeeches\tMotions");
console.log("----\t\t--------\t-------");
sortedDates.forEach(date => {
  console.log(`${date}\t${groupedData[date].speech}\t\t${groupedData[date].motion}`);
});

// Output the total counts
const totalSpeeches = speechCounts.reduce((sum, count) => sum + count, 0);
const totalMotions = motionCounts.reduce((sum, count) => sum + count, 0);
console.log("\nTotal Speeches:", totalSpeeches);
console.log("Total Motions:", totalMotions);
console.log("Total Items:", totalSpeeches + totalMotions);

// Convert canvas to buffer
const buffer = canvas.toBuffer('image/png');

// Display the image in the console (this is just for visualization in the Node.js environment)
console.log("Histogram created successfully!");
console.log("The histogram shows the distribution of speeches and motions by date.");
