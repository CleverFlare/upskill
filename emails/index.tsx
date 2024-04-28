import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000/login";

export const AcceptedEmail = ({ userFirstname }: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your path to unlocking your potential through highly professional courses
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://ik.imagekit.io/upskill/logo.png?updatedAt=1714336045171`}
          width="45"
          height="50"
          alt="Upskill"
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Upskill, your path to unlocking your potential and get
          ahead in your favorite career. We are reaching out to inform and
          congratulate you that you've been accepted as an instructor!
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${baseUrl}`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The upskill team
        </Text>
      </Container>
    </Body>
  </Html>
);

AcceptedEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default AcceptedEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#2487eb",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};
