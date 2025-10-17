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
import React from "react";
import usePermissionSelection from "src/hooks/admin/permission-selection-hook";

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
    handleSelectAll, // Added back
    handleSubmit,
    models,
  } = usePermissionSelection(roleId, type);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
                // Logic for header checkbox state
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
                          handleSelectAll(header, e.target.checked)
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
              return (
                <TableRow key={model}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {/* Model-level "select all" is still removed */}
                      <Typography>{model}</Typography>
                    </Box>
                  </TableCell>
                  {permissionHeaders.map((permissionName) => {
                    const permission = permissions.find(
                      (p) =>
                        p.model === model && p.name.includes(permissionName),
                    );

                    // Only disable "view" if any primary is selected
                    let disabled = false;
                    if (permissionName === "view") {
                      const primaries = ["create", "update", "delete", "check", "approve", "authorize"];
                      const selectedPrimary = primaries.find((name) => {
                        const perm = permissions.find(
                          (p) => p.model === model && p.name.includes(name)
                        );
                        return perm && selectedPermissions[perm.id];
                      });
                      if (selectedPrimary) {
                        disabled = true;
                      }
                    }

                    return (
                      <TableCell key={`${model}-${permissionName}`}>
                        {permission && (
                          <Switch
                            checked={selectedPermissions[permission.id] || false}
                            onChange={() =>
                              handleCheckboxChange(permission.id, permissionName, model)
                            }
                            disabled={disabled}
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