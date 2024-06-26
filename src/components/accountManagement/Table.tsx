'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Radio, Button, CircularProgress } from '@mui/material';
import "@/styles/accountManagement/DataTable.css";
import AccountInfolModal from './AccountInfolModal';
import { AccountListResType, AccountType } from '@/schemaValidations/accountManagement/account.schema';
import accountApiRequest from '@/apiRequests/accountManagement/account';
import dayjs from 'dayjs';
import ButtonGroupAccount from "@/components/accountManagement/ButtonGroup";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface FormFilterData {
  id: string
  "username": string;
  email: string;
  role: string;
  "created-at-from": string;
  "created-at-to": string;
}
export interface RowData {
  id: string
  "user-name": string;
  email: string;
  role: string;
  "created-at": string;
}

function TableAccount({
  isFilter,
  dataFilter,
}: {
  isFilter: boolean;
  dataFilter: FormFilterData | null;
}) {
  const [data, setData] = React.useState<AccountListResType | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedValue, setSelectedValue] = React.useState<RowData>();

  // handle detail modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [accountDetail, setAccountDetail] = React.useState<AccountType | null>(null);

  const [refreshKey, setRefreshKey] = React.useState(0);
  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    setSelectedValue(undefined);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, row: RowData) => {
    setSelectedValue(row);
    console.log("co len: ", row)
  };

  const handleDeselectAll = () => {
    setSelectedValue(undefined);
  };

  const handleViewDetail = (row: AccountType) => {
    setAccountDetail(row);
    setOpenModal(true);
  };

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { payload } = await accountApiRequest.getListAccount(page + 1, rowsPerPage, isFilter ? dataFilter : {});
        setData(payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFilter, page, rowsPerPage, dataFilter, refreshKey]);

  return (
    <div style={{ maxHeight: 762, width: '100%', marginTop: "10px" }}>
      <TableContainer component={Paper}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
        ) : (
          <Table sx={{ minWidth: 640 }} aria-label="customized table">
            <TableHead>

              <TableRow>
                <StyledTableCell sx={{ width: 70 }} align='center'>
                  <Radio
                    onClick={handleDeselectAll}
                    className="radio-buttons"
                    color='secondary'
                  />
                </StyledTableCell>

                <StyledTableCell>Tên Người Dùng</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Ngày tạo</StyledTableCell>
                <StyledTableCell>Xem chi tiết</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.data.map((account, index) => (
                <StyledTableRow key={index}>

                  <div className="radio-cell" style={{ margin: "3px 0 0 14px" }}>
                    <Radio
                      checked={selectedValue?.id === account.id}
                      onChange={(event) => handleRadioChange(event, account)}
                      value={account.id.toString()}
                      className="radio-buttons"
                    />
                  </div>
                  <StyledTableCell>{account['user-name']}</StyledTableCell>
                  <StyledTableCell>{account.email}</StyledTableCell>
                  <StyledTableCell>{account.role}</StyledTableCell>
                  <StyledTableCell>{dayjs(account['created-at']).format("DD/MM/YYYY")}</StyledTableCell>

                  <StyledTableCell>
                    <Button size='small' onClick={() => handleViewDetail(account)}>Click</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data?.paging.items || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="custom-row custom-pagination"
      />

      <AccountInfolModal open={openModal} handleClose={() => setOpenModal(false)} selectedRow={accountDetail} />

      <ButtonGroupAccount row={selectedValue} triggerRefresh={triggerRefresh} />

    </div>
  );
}
export default TableAccount;