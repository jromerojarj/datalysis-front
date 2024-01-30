import { Jobs } from "@/interfaces/migration";

export async function uploadJobs({ data }: { data: [] }) {
  console.log("Data:", data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return {
      statusCode: res.status,
      statusText: res.statusText,
      info: await res.json(),
    };
  } catch (error) {
    console.error(error);
  }
}

export async function uploadDepartments({ data }: { data: [] }) {
  console.log(data);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/department/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return {
      statusCode: res.status,
      statusText: res.statusText,
      info: await res.json(),
    };
  } catch (error) {
    console.error(error);
  }
}

export async function uploadEmployees({ data }: { data: [] }) {
  console.log(data);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employee/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return {
      statusCode: res.status,
      statusText: res.statusText,
      info: await res.json(),
    };
  } catch (error) {
    console.error(error);
  }
}
