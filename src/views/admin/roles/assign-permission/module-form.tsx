import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { appModulesNames, appModulesWithIds } from "src/configs/app-constants";
import usePermissionSelection from "src/hooks/admin/permission-selection-hook";
import masterTypeApiService from "src/services/master-data/master-type-service";
import { MasterType } from "src/types/master/master-types";

// Define the types for permission and props
interface AssignPermissionComponentProps {
  roleId: string;
  module: {
    id: string;
    name: string;
    flags?: undefined;
  } | {
    id: string;
    name: string;
    flags: {
      id: string;
      name: string;
    }[];
  };
}

interface AccordionDetailProps {
  type: string;
  roleId: string;
}

const AccordionDetail: React.FC<AccordionDetailProps> = ({
  type,
  roleId,
}) => {
  const {
    permissions,
    selectedPermissions,
    isLoading,
    isSubmitting,
    error,
    handleCheckboxChange,
    handleSelectAll,
    handleModelSelectAll,
    handleSubmit,
    models,
  } = usePermissionSelection(roleId, type);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Remove console.log to improve performance
  const permissionHeaders = [
    "create",
    "update",
    "delete",
    "view",
    "approve",
    "check",
    "authorize",
  ];

  return (
    <AccordionDetails>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Model</TableCell>
              {permissionHeaders.map((header, index) => {
                // Check if there are any permissions with this action name
                const headerPermissions = permissions.filter((p) =>
                  p.name.includes(header),
                );
                const allChecked =
                  headerPermissions.length > 0 &&
                  headerPermissions.every((p) => selectedPermissions[p.id]);
                const someChecked = headerPermissions.some(
                  (p) => selectedPermissions[p.id],
                );

                return (
                  <TableCell key={index}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={allChecked}
                        indeterminate={someChecked && !allChecked}
                        onChange={(e) =>
                          handleSelectAll(e.target.checked, header)
                        }
                        disabled={headerPermissions.length === 0}
                      />
                      <Typography>{header}</Typography>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map((model) => {
              const modelPermissions = permissions.filter(
                (p) => p.model === model,
              );
              const allModelChecked =
                modelPermissions.length > 0 &&
                modelPermissions.every((p) => selectedPermissions[p.id]);
              const someModelChecked = modelPermissions.some(
                (p) => selectedPermissions[p.id],
              );

              return (
                <TableRow key={model}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={allModelChecked}
                        indeterminate={someModelChecked && !allModelChecked}
                        onChange={(e) =>
                          handleModelSelectAll(model, e.target.checked)
                        }
                      />
                      <Typography>{model}</Typography>
                    </Box>
                  </TableCell>
                  {permissionHeaders.map((permissionName) => {
                    const permission = permissions.find(
                      (p) =>
                        p.model === model && p.name.includes(permissionName),
                    );

                    return (
                      <TableCell key={`${model}-${permissionName}`}>
                        {permission && (
                          <Switch
                            checked={
                              selectedPermissions[permission.id] || false
                            }
                            onChange={() => handleCheckboxChange(permission.id)}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Assign Permissions"}
        </Button>
      </Box>
    </AccordionDetails>
  );
};

const AssignPermissionComponent: React.FC<AssignPermissionComponentProps> = ({
  roleId,
  module
}) => {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  return (
    <div>
      {module?.flags && module?.flags.map((flag, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={(event, isExpanded) => {
            setExpanded(isExpanded ? `panel${index}` : false);
          }}
        >
          <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
            <Typography variant="h6">{flag.name}</Typography>
          </AccordionSummary>
          {expanded === `panel${index}` && (
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AccordionDetail roleId={roleId} type={flag.name} />
                </Grid>
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default AssignPermissionComponent;
