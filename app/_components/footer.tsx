import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          {/* [WHITE-LABEL] Texto de copyright — troque "FSW Barber" pelo nome do cliente */}
          <p className="text-sm text-gray-400">
            © 2026 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
