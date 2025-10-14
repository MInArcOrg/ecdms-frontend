// ** React Imports
import { ReactElement, ReactNode } from "react";

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Styled Components
const CircleContainer = styled(Box)(({ theme }) => ({
  zIndex: 2,
  borderRadius: "50%",
  overflow: "hidden",
  width: 400,
  height: 400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  flexShrink: 0,
  [theme.breakpoints.down("lg")]: {
    width: 300,
    height: 300,
  },
  [theme.breakpoints.down("md")]: {
    width: 250,
    height: 250,
  },
}));

const Illustration = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));

interface AuthContainerProps {
  children: ReactNode;
  illustrationName: string;
  title?: string;
  subtitle?: string;
}

const AuthContainer = ({
  children,
  illustrationName,
  title = "ECDMS",
  subtitle = "Ethiopian Construction Data Managment System",
}: AuthContainerProps) => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const { settings } = useSettings();
  const { skin } = settings;

  const imageSource =
    skin === "bordered" ? illustrationName + "bordered" : illustrationName;
  const illustrationSrc = `/images/pages/${imageSource}-${theme.palette.mode}.png`;

  return (
    <Box
      className="content-right"
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {!hidden && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "customColors.bodyBg",
            borderRadius: "20px",
            margin: (theme) => theme.spacing(8, 0, 8, 8),
          }}
        >
          <CircleContainer>
            <Illustration alt="auth-illustration" src={illustrationSrc} />
          </CircleContainer>

          {/* Header and Subtitle below the illustration */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h1" sx={{ fontWeight: 600, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              {subtitle}
            </Typography>
          </Box>

          <FooterIllustrationsV2 />
        </Box>
      )}

      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

AuthContainer.getLayout = (page: ReactElement) => (
  <BlankLayout>{page}</BlankLayout>
);

export default AuthContainer;
