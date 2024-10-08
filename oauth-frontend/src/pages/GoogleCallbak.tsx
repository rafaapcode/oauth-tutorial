import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { AuthService } from "../services/AuthService";

const GoogleCallbak = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(searchParams);
  const code = urlSearchParams.get("code");
  useEffect(() => {
    if(code) {
      AuthService.SignIn(code)
      .then((res) => {
        if(!res.error) {
          console.log(res.data);
          toast.success(res.data.message);
          navigate("/home")
        } else {
          console.log(res);
          toast.error(res.data.message);
          navigate("/");
        }
      })
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen justify-center items-center container mx-auto">
      <VscLoading className="size-10 animate-spin text-white"/>
    </div>
  )
}

export default GoogleCallbak