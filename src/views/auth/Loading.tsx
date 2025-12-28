import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      {/* 加载内容区域 */}
      <div className="bg-card0 border rounded-lg p-6 space-y-6">
        {/* 装饰性骨架屏 */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-10" />
          </div>
          <Skeleton className="h-10" />
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">Please wait a moment...</p>
      </div>
    </>
  );
};

export const SignInLoading = () => {
  return (
    <div className="w-[350px] mx-auto space-y-8">
      {/* 品牌Logo区域 */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-md opacity-90" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">auth.signIn</h1>
      </div>
      <Loading />
    </div>
  );
};

export const SignUpLoading = () => {
  return (
    <div className="w-[350px] mx-auto space-y-8">
      {/* 品牌Logo区域 */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-md opacity-90" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">auth.signUp</h1>
      </div>

      <Loading />
    </div>
  );
};

export const ForgotPwdLoading = () => {
  return (
    <div className="w-[350px] mx-auto space-y-8">
      {/* 品牌Logo区域 */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-md opacity-90" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">auth.forgotPwd</h1>
      </div>

      <Loading />
    </div>
  );
};
