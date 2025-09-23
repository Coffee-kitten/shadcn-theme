import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export function FourZeroFour() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // 检查是否有token，决定跳转到哪里
    const token = localStorage.getItem("authorization");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-svh w-full flex items-center justify-center px-2">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
          404
        </h1>
        <p className="text-gray-500">
          Looks like you've ventured into the unknown digital realm.
        </p>
        <Button onClick={handleGoHome}>Return to website</Button>
      </div>
    </div>
  );
}
