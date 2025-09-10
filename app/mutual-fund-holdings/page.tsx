"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

interface Holding {
  ISIN: string;
  Name: string;
  Industry: string;
  Quantity: number;
  MarketValue: number;
  PercentToNav: number;
}

interface ComparisonResult extends Holding {
  pastQty: number | null;
  change: "NEW" | "EXITED" | "INCREASED" | "DECREASED" | "UNCHANGED";
  qtyChange: number;
  pctChange: number | null;
}

export default function HoldingsComparison() {
  const [pastFile, setPastFile] = useState<File | null>(null);
  const [latestFile, setLatestFile] = useState<File | null>(null);
  const [results, setResults] = useState<ComparisonResult[]>([]);

  // Parse and normalize Excel file (works for both HDFC & ICICI)
  const normalizeExcel = async (file: File): Promise<Holding[]> => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Detect format
    const headerRow = json.find((row) =>
      row.includes("Name Of the Instrument") ||
      row.includes("Company/Issuer/Instrument Name")
    );

    if (!headerRow) throw new Error("Could not detect format");

    const startIndex = json.indexOf(headerRow);
    const rows = XLSX.utils.sheet_to_json(sheet, { range: startIndex });

    // Normalize
    return rows
      .filter((row: any) => row["ISIN"] && row["Quantity"])
      .map((row: any) => {
        const isHDFC = !!row["Name Of the Instrument"];

        return {
          ISIN: row["ISIN"],
          Name: isHDFC
            ? row["Name Of the Instrument"]
            : row["Company/Issuer/Instrument Name"],
          Industry: row["Industry+ /Rating"] || row["Industry/Rating"] || "",
          Quantity: Number(row["Quantity"]),
          MarketValue:
            Number(row["Market/ Fair Value (Rs. in Lacs.)"]) ||
            Number(row["Exposure/Market Value(Rs.Lakh)"]) ||
            0,
          PercentToNav:
            Number(row["% to NAV"]) || Number(row["% to Nav"]) || 0,
        };
      });
  };

  const compare = async () => {
    if (!pastFile || !latestFile) return;

    const pastHoldings = await normalizeExcel(pastFile);
    const latestHoldings = await normalizeExcel(latestFile);

    const pastMap = new Map(pastHoldings.map((h) => [h.ISIN, h]));
    const comparison: ComparisonResult[] = [];

    // Latest positions
    for (const latest of latestHoldings) {
      const past = pastMap.get(latest.ISIN);

      if (!past) {
        comparison.push({
          ...latest,
          pastQty: null,
          change: "NEW",
          qtyChange: latest.Quantity,
          pctChange: null,
        });
      } else {
        const diff = latest.Quantity - past.Quantity;
        let change: ComparisonResult["change"] = "UNCHANGED";

        if (diff > 0) change = "INCREASED";
        else if (diff < 0) change = "DECREASED";

        comparison.push({
          ...latest,
          pastQty: past.Quantity,
          change,
          qtyChange: diff,
          pctChange: past.Quantity
            ? Number(((diff / past.Quantity) * 100).toFixed(2))
            : null,
        });

        pastMap.delete(latest.ISIN);
      }
    }

    // Exited positions
    for (const exited of pastMap.values()) {
      comparison.push({
        ...exited,
        pastQty: exited.Quantity,
        change: "EXITED",
        qtyChange: -exited.Quantity,
        pctChange: -100,
      });
    }

    setResults(comparison);
  };

  const downloadResults = () => {
  if (results.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(
    results.map((r) => ({
      ISIN: r.ISIN,
      Name: r.Name,
      "Past Qty": r.pastQty ?? "-",
      "Latest Qty": r.Quantity,
      Change: r.change,
      "Qty Diff": r.qtyChange,
      "% Change": r.pctChange !== null ? `${r.pctChange}%` : "-",
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Comparison");

  XLSX.writeFile(workbook, "holdings-comparison.xlsx");
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mutual Fund Holdings Comparison</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Past Month</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setPastFile(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Latest Month</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setLatestFile(e.target.files?.[0] || null)}
          />
        </div>
        <button
          onClick={compare}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
        <button
  onClick={downloadResults}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Download Excel
</button>
      </div>

      {results.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ISIN</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Past Qty</th>
              <th className="border p-2">Latest Qty</th>
              <th className="border p-2">Change</th>
              <th className="border p-2">Qty Diff</th>
              <th className="border p-2">% Change</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={i}
                className={
                  r.change === "NEW"
                    ? "bg-green-100"
                    : r.change === "EXITED"
                    ? "bg-red-100"
                    : r.change === "INCREASED"
                    ? "bg-blue-100"
                    : r.change === "DECREASED"
                    ? "bg-yellow-100"
                    : ""
                }
              >
                <td className="border p-2">{r.ISIN}</td>
                <td className="border p-2">{r.Name}</td>
                <td className="border p-2">{r.pastQty ?? "-"}</td>
                <td className="border p-2">{r.Quantity}</td>
                <td className="border p-2">{r.change}</td>
                <td className="border p-2">{r.qtyChange}</td>
                <td className="border p-2">
                  {r.pctChange !== null ? `${r.pctChange}%` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
