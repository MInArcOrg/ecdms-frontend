import { Box, Typography, Link, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";

const SupportDrawer = (props: { open: boolean; toggle: () => void }) => {
  const { open, toggle } = props;
  const { t } = useTranslation();

  return (
    <CustomSideDrawer
      title={"footer.support.title"}
      handleClose={toggle}
      open={open}
    >
      {() => (
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              {t("footer.support.heading")}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {t("footer.support.description")}
            </Typography>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                📧 {t("footer.support.emailLabel")}
              </Typography>
              <Link href="mailto:support@example.com" underline="hover">
                {t("footer.support.email")}
              </Link>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                📞 {t("footer.support.phoneLabel")}
              </Typography>
              <Link href="tel:+1234567890" underline="hover">
                {t("footer.support.phone")}
              </Link>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {t("footer.support.hours")}
            </Typography>
          </Stack>
        </Box>
      )}
    </CustomSideDrawer>
  );
};

export default SupportDrawer;
