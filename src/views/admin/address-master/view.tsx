import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddressMaster,
  AddressType,
  addressTypes,
} from "src/types/admin/address";
import AddressMasterList from "./list";
import { useQuery } from "@tanstack/react-query";
import addressmasterApiService from "src/services/admin/address-master-service";
// Assuming 'addressTypes' is imported or defined here

// New
interface AddressMasterViewProps {
  parentAddressMaster?: AddressMaster;
  parentId?: string;
  initialType?: AddressType;
}

const AddressMasterView = (props: AddressMasterViewProps) => {
  const { t } = useTranslation();
  const { parentId, initialType } = props;
  const { data: parentAddressMaster } = useQuery({
    queryKey: ["address-master", parentId],
    queryFn: () => addressmasterApiService.getOne(parentId as string, {}),
    enabled: !!parentId,
  });
  // --- STATE FOR TABS (Now handled locally) ---
  const [activeType, setActiveType] = useState<AddressType | undefined>(
    initialType
  );

  // --- LOGIC: Calculate Available Tabs ---
  const availableTabs = useMemo(() => {
    // If no parent data, we can't determine children, so return an empty array (or handle root case if needed)
    if (!initialType) return [];

    const parentConfig = addressTypes.find(
      (c) => c.type === initialType
    );
    return parentConfig?.children || [];
  }, [initialType]);

  useEffect(() => {
    // If we have calculated tabs, ensure the activeType is one of them.
    if (
      availableTabs.length > 0 &&
      !availableTabs.includes(activeType as AddressType)
    ) {
      // Set the first available child type as the active tab
      setActiveType(availableTabs[0]);
    } else if (initialType) {
      // If we received an initial type (e.g., from the URL route), use that.
      setActiveType(initialType);
    }
  }, [availableTabs, initialType]);

  // --- HANDLER: Tab Change ---
  const handleTabChange = (_: React.SyntheticEvent, newValue: AddressType) => {
    setActiveType(newValue);
  };

  return (
    <Grid container spacing={2}>
      {/* LEFT: Parent Address Card */}
      <Grid item xs={12} md={4} lg={3}>
        {parentAddressMaster?.payload && (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              backgroundColor: "background.paper",
              height: "100%",
            }}
          >
            <CardContent>
              {/* ... Parent Card Content remains the same ... */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h4" fontWeight={500}>
                    {parentAddressMaster?.payload.title || "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t("address-master.columns.type")}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {parentAddressMaster?.payload.type || "-"}
                  </Typography>
                  <Typography
                    href={`/address-master/structure/${parentAddressMaster?.payload.id}`}
                    component={Link}
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      color: "primary.main",
                    }}
                    mb={2}
                  >
                    {t("address-master.address-structure")}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* RIGHT: Tabs & List */}
      <Grid item xs={12} md={8} lg={9}>
        {/* Render Tabs ONLY if multiple children types exist */}
        {availableTabs.length > 1 && activeType && (
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={activeType}
              onChange={handleTabChange}
              aria-label="address type tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              {availableTabs.map((childType) => (
                <Tab
                  key={childType}
                  label={t(`address-master.${childType.toLowerCase()}`)}
                  value={childType}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Render the List, passing the active type and parent context */}
        {activeType && (
          <AddressMasterList
            type={activeType}
            parentId={parentId}
            parentAddressMaster={
              parentAddressMaster?.payload || ({} as AddressMaster)
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AddressMasterView;
