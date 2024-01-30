"use client";

import { Button, Spinner, Tab, UploadFile } from "@/components";
import Papa, { ParseResult } from "papaparse";
import { uploadDepartments, uploadEmployees, uploadJobs } from "./actions";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { compareArrays } from "@/utils";
import { toast } from "react-toastify";

interface CSVRow {
  [key: string]: string;
}

interface CSVDataAnalysis {
  quantity: number;
  batchs: number;
  errors: CSVRow[];
}

const headers = {
  jobs: ["id", "job"],
  departments: ["id", "department"],
  employees: ["id", "name", "datetime", "job_id", "department_id"],
};

const tabs = [
  {
    id: 1,
    label: "Jobs",
  },
  {
    id: 2,
    label: "Departments",
  },
  {
    id: 3,
    label: "Employees",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CSVRow[][]>([]);
  const [batchSelected, setBatchSelected] = useState<number | null>(null);
  const [batchsUploaded, setBatchsUploaded] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [batchsUploading, setbatchsUploading] = useState<number | null>(null);
  const [batchsUploadedList, setbatchsUploadedList] = useState<number[]>([]);
  const [batchsErrorList, setbatchsErrorList] = useState<number[]>([]);

  const [analysisData, setAnalysisData] = useState<CSVDataAnalysis>({
    quantity: 0,
    batchs: 0,
    errors: [],
  });

  const processData = (results: ParseResult<CSVRow>) => {
    if (results.errors.length > 0) {
      toast.error("El archivo contiene errores");
      return;
    }
    if (results.meta.fields?.length) {
      if (
        activeTab === 1 &&
        !compareArrays(results.meta.fields, headers.jobs)
      ) {
        toast.error("El archivo no contiene el formato correcto");
        setFile(null);
        setIsLoadingData(false);
        return;
      }
      if (
        activeTab === 2 &&
        !compareArrays(results.meta.fields, headers.departments)
      ) {
        setFile(null);
        toast.error("El archivo no contiene el formato correcto");
        setIsLoadingData(false);
        return;
      }
      if (
        activeTab === 3 &&
        !compareArrays(results.meta.fields, headers.employees)
      ) {
        setFile(null);
        toast.error("El archivo no contiene el formato correcto");
        setIsLoadingData(false);
        return;
      }
    }
    toast.success("El archivo con formato correcto");

    const dataPlainData = results.data;
    const quantity = dataPlainData.length;
    const batchs = Math.ceil(quantity / 1000);
    const data = [];

    for (let i = 0; i < batchs; i++) {
      const dataBatch = dataPlainData
        .map((item) => {
          if (activeTab === 1 || activeTab === 2) {
            return { ...item, id: Number(item.id) };
          }
          if (activeTab === 3) {
            return {
              ...item,
              id: Number(item.id),
              datetime: new Date(item.datetime),
              job_id: Number(item.job_id),
              department_id: Number(item.department_id),
            };
          }
        })
        .slice(i * 1000, (i + 1) * 1000);
      data.push(dataBatch);
    }
    setAnalysisData({
      ...analysisData,
      quantity,
      batchs,
    });
    setData(data as any);

    setIsLoadingData(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingData(true);
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFile(file);
      Papa.parse<CSVRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<CSVRow>) => {
          processData(results);
        },
      });
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      setData([]);
      setIsLoadingData(false);
      setBatchSelected(null);
      setBatchsUploaded(0);
      setbatchsUploading(null);
      setbatchsUploadedList([]);
      setbatchsErrorList([]);

      setAnalysisData({
        quantity: 0,
        batchs: 0,
        errors: [],
      });
    }
  }, [activeTab]);

  const handleUploadFiles = async () => {
    setIsUploading(true);
    for (const batch in data) {
      setbatchsUploading(Number(batch));

      const response =
        activeTab === 1
          ? await uploadJobs({ data: data[batch] as any })
          : activeTab === 2
          ? await uploadDepartments({ data: data[batch] as any })
          : activeTab === 3
          ? await uploadEmployees({ data: data[batch] as any })
          : null;
      console.log(response);

      if (response?.statusCode === 201) {
        setBatchsUploaded(batchsUploaded + 1);
        setBatchsUploaded(batchsUploaded + 1);
        setbatchsUploadedList([...batchsUploadedList, Number(batch)]);
        toast.success(`Batch ${batch + 1} uploaded`);
      } else {
        setBatchsUploaded(batchsUploaded + 1);
        setbatchsErrorList([...batchsErrorList, Number(batch)]);
        toast.error(`Batch ${batch + 1} error`);
      }
      setbatchsUploading(null);
      if (Number(batch) > 3) {
        break;
      }
    }

    setIsUploading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <header className="">
        <h1 className="text-5xl font-bold">Datalysis Front</h1>
      </header>
      <Tab
        items={tabs}
        active={activeTab}
        onClick={(item) => setActiveTab(item.id)}
      />
      <div className="flex flex-col text-center">
        <span>The format must be:</span>
        <span className="font-bold">
          {headers[
            tabs[activeTab - 1].label.toLowerCase() as keyof typeof headers
          ].toString()}
        </span>
      </div>
      <UploadFile
        file={file}
        handleFileUpload={handleFileUpload}
        handleDeleteFile={handleDeleteFile}
      />
      <div className="w-full">
        {data.length > 0 ? (
          <div>
            <div className="flex gap-10 font-bold">
              <span>
                Entries:{" "}
                <span className="font-normal">{analysisData.quantity}</span>
              </span>
              <span>
                Batchs:{" "}
                <span className="font-normal">{analysisData.batchs}</span>
              </span>
            </div>
            <div className="flex gap-10 font-bold">
              <span>
                Uploaded batchs:{" "}
                <span className="font-normal">
                  {batchsUploaded} / {analysisData.batchs}
                </span>
              </span>
            </div>
            <Button
              label="Upload batchs"
              onClick={() => handleUploadFiles()}
              disabled={isUploading || batchsUploaded === analysisData.batchs}
            />
            <div>
              <div className="mt-20">
                {data.map((batch, index) => (
                  <div key={index}>
                    <div className="flex gap-10">
                      <div>
                        {batchsUploading == index
                          ? "Uploading"
                          : batchsUploadedList.includes(index)
                          ? "Uploaded"
                          : batchsErrorList.includes(index)
                          ? "Error"
                          : "Pending"}
                      </div>
                      <div className="w-[300px]">Batch {index + 1}</div>
                      <div
                        className="cursor-pointer text-blue-800"
                        onClick={() =>
                          setBatchSelected(
                            index === batchSelected ? null : index
                          )
                        }
                      >
                        {index === batchSelected ? "Hide" : "Show"} details
                      </div>
                    </div>
                    <div>
                      <table
                        className={clsx({
                          hidden: batchSelected !== index,
                          block: batchSelected === index,
                        })}
                      >
                        <thead>
                          <tr>
                            {Object.keys(batch[0]).map((item, index3) => (
                              <th key={`itemhead${index3}`}>{item}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {batch.map((item, index2) => (
                            <tr key={`mainItem${index2}`}>
                              {Object.values(item).map((item, index3) => (
                                <td key={`item${index3}`}>{item.toString()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {isLoadingData ? (
              <div className="flex items-center justify-center">
                <Spinner width="20" oneColor color="blue" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Data is empty
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div>{data.length > 0 && <pre>{JSON.stringify(data, null, 2)}</pre>}</div> */}
    </main>
  );
}
