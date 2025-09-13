import { Box, Button, Stack, Tooltip } from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import axios from "axios";

const AssetsTable = () => {
  const [assets, setAssets] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", editable: true, width: 320 },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      width: 320,
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      editable: true,
      width: 320,
    },
    { field: "type", headerName: "Type", editable: true, width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, ...rest }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id, rest)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, rest) => () => {
    console.log("digit4 rest:", rest.row);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setAssets(assets.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = assets.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(assets.filter((row) => row.id !== id));
    }
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setAssets((oldRows) => [
        ...oldRows,
        { id, name: "", age: "", role: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <Toolbar>
        <Tooltip title="Add record">
          <ToolbarButton onClick={handleClick}>
            <AddIcon fontSize="small" />
          </ToolbarButton>
        </Tooltip>
      </Toolbar>
    );
  }
  const fetchAssets = async () => {
    const response = await axios.get("http://localhost:5000/asset/all");
    setAssets(response.data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained">Add Row</Button>
      </Stack>
      <DataGrid
        columns={columns}
        rows={assets}
        editMode="row"
        rowModesModel={rowModesModel}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setAssets, setRowModesModel },
        }}
        showToolbar
      />
    </Box>
  );
};

export default AssetsTable;
