import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MessageCircle, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ticketSavePost } from "@/api/ticket";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export const Card1 = ({ onTicketCreated }: any) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    subject: "",
    level: 0,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTicket = async () => {
    if (!createForm.subject.trim() || !createForm.message.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // 模拟API调用延迟
      await ticketSavePost(createForm);
      toast.success("工单创建成功");
      // 重置表单
      setCreateForm({
        subject: "",
        level: 0,
        message: "",
      });
      // 关闭对话框
      setIsCreateOpen(false);
      // 刷新工单列表数据
      onTicketCreated();
    } catch (error: any) {
      toast.warning(error?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            工单支持
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" />
                创建工单
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b">
                <DialogHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <DialogTitle className="text-xl font-semibold">
                      创建新工单
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-muted-foreground">
                    描述您遇到的问题，我们的技术团队将尽快为您提供专业支持
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      工单主题
                    </Label>
                    <Input
                      id="subject"
                      placeholder="简要描述您的问题"
                      className="h-11"
                      value={createForm.subject}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="level"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      优先级别
                    </Label>
                    <Select
                      value={createForm.level.toString()}
                      onValueChange={(value) =>
                        setCreateForm({ ...createForm, level: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">低优先级</SelectItem>
                        <SelectItem value="1">中优先级</SelectItem>
                        <SelectItem value="2">高优先级</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      问题详情
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="请详细描述您遇到的问题，包括具体的错误信息、操作步骤等，这将帮助我们更快地为您解决问题"
                      className="min-h-[140px] resize-none"
                      value={createForm.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setCreateForm({
                          ...createForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-6"
                    disabled={isSubmitting}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleCreateTicket}
                    disabled={
                      isSubmitting ||
                      !createForm.subject.trim() ||
                      !createForm.message.trim()
                    }
                    className="px-6 bg-primary hover:bg-primary/90"
                  >
                    {/* {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        创建中...
                      </>
                    ) : (

                    )} */}
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Please wait
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2" />
                        创建工单
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          遇到问题？创建工单获得技术支持，我们会尽快为您解决。
        </p>
      </CardContent>
    </Card>
  );
};
