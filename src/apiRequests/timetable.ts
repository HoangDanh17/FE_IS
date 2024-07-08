import http from "@/lib/http";
import {
  CreateResType,
  TimeTableFilterType,
  TimeTableResType,
  WeekResType,
} from "@/schemaValidations/timetable.schema";

const timetableApiRequest = {
  getTimeTable: (body: TimeTableFilterType | null) =>
    http.get<TimeTableResType>(
      `/api/v1/timetables?${
        body?.["intern-name"] ? `&intern-name=${body["intern-name"]}` : ""
      }${body?.verified ? `&verified=${body.verified}` : ""}${
        body?.["office-time-from"]
          ? `&office-time-from=${body["office-time-from"]}`
          : ""
      }${
        body?.["office-time-to"]
          ? `&office-time-to=${body?.["office-time-to"]}`
          : ""
      }`
    ),
  approveTimeTable: (id: string, body: { verified: string }) =>
    http.post<CreateResType>(`/api/v1/timetables/${id}/approve`, body),
  getCurrentWeek: () => http.get<WeekResType>(`/api/v1/timetables/weekly`),
};

export default timetableApiRequest;
