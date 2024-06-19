import http from "@/lib/http";
import {
  CreateResType,
  TimeTableFilterType,
  TimeTableResType,
} from "@/schemaValidations/timetable.schema";

const timetableApiRequest = {
  getTimeTable: (body: TimeTableFilterType | null) =>
    http.get<TimeTableResType>(
      `/api/v1/timetables?${
        body?.["intern-name"] ? `&intern-name=${body["intern-name"]}` : ""
      }${body?.status ? `&status=${body.status}` : ""}${
        body?.["office-time-from"]
          ? `&office-time-from=${body["office-time-from"]}`
          : ""
      }${
        body?.["office-time-to"]
          ? `&office-time-to=${body?.["office-time-to"]}`
          : ""
      }`
    ),
  approveTimeTable: (id: string, body: { status: string }) =>
    http.post<CreateResType>(`/api/v1/timetables/${id}/approve`, body),
};

export default timetableApiRequest;
