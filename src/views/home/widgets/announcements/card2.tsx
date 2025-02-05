import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useV2boardUserData } from "@/store/index";
import dayjs from "dayjs";
export function Card2() {
  const store = useV2boardUserData();
  return (
    <>
      {store.noticeFetchData.data.map((item: any, index: any) => (
        <Card
          key={index}
          className="flex items-center justify-between bg-[url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIwMCIgd2lkdGg9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwIDgpIj48Y2lyY2xlIGN4PSIxNzYiIGN5PSIxMiIgcj0iNCIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48cGF0aCBkPSJNMjAuNS41bDIzIDExbS0yOSA4NGwtMy43OSAxMC4zNzdNMjcuMDM3IDEzMS40bDUuODk4IDIuMjAzLTMuNDYgNS45NDcgNi4wNzIgMi4zOTItMy45MzMgNS43NThtMTI4LjczMyAzNS4zN2wuNjkzLTkuMzE2IDEwLjI5Mi4wNTIuNDE2LTkuMjIyIDkuMjc0LjMzMk0uNSA0OC41czYuMTMxIDYuNDEzIDYuODQ3IDE0LjgwNWMuNzE1IDguMzkzLTIuNTIgMTQuODA2LTIuNTIgMTQuODA2TTEyNC41NTUgOTBzLTcuNDQ0IDAtMTMuNjcgNi4xOTJjLTYuMjI3IDYuMTkyLTQuODM4IDEyLjAxMi00LjgzOCAxMi4wMTJtMi4yNCA2OC42MjZzLTQuMDI2LTkuMDI1LTE4LjE0NS05LjAyNS0xOC4xNDUgNS43LTE4LjE0NSA1LjciIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48cGF0aCBkPSJNODUuNzE2IDM2LjE0Nmw1LjI0My05LjUyMWgxMS4wOTNsNS40MTYgOS41MjEtNS40MSA5LjE4NUg5MC45NTN6bTYzLjkwOSAxNS40NzloMTAuNzV2MTAuNzVoLTEwLjc1eiIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48ZyBmaWxsPSIjZGRkIj48Y2lyY2xlIGN4PSI3MS41IiBjeT0iNy41IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxNzAuNSIgY3k9Ijk1LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjgxLjUiIGN5PSIxMzQuNSIgcj0iMS41Ii8+PGNpcmNsZSBjeD0iMTMuNSIgY3k9IjIzLjUiIHI9IjEuNSIvPjxwYXRoIGQ9Ik05MyA3MWgzdjNoLTN6bTMzIDg0aDN2M2gtM3ptLTg1IDE4aDN2M2gtM3oiLz48L2c+PHBhdGggZD0iTTM5LjM4NCA1MS4xMjJsNS43NTgtNC40NTQgNi40NTMgNC4yMDUtMi4yOTQgNy4zNjNoLTcuNzl6TTEzMC4xOTUgNC4wM2wxMy44MyA1LjA2Mi0xMC4wOSA3LjA0OHptLTgzIDk1bDE0LjgzIDUuNDI5LTEwLjgyIDcuNTU3LTQuMDEtMTIuOTg3ek01LjIxMyAxNjEuNDk1bDExLjMyOCAyMC44OTdMMi4yNjUgMTgweiIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48cGF0aCBkPSJNMTQ5LjA1IDEyNy40NjhzLS41MSAyLjE4My45OTUgMy4zNjZjMS41NiAxLjIyNiA4LjY0Mi0xLjg5NSAzLjk2Ny03Ljc4NS0yLjM2Ny0yLjQ3Ny02LjUtMy4yMjYtOS4zMyAwLTUuMjA4IDUuOTM2IDAgMTcuNTEgMTEuNjEgMTMuNzMgMTIuNDU4LTYuMjU3IDUuNjMzLTIxLjY1Ni01LjA3My0yMi42NTQtNi42MDItLjYwNi0xNC4wNDMgMS43NTYtMTYuMTU3IDEwLjI2OC0xLjcxOCA2LjkyIDEuNTg0IDE3LjM4NyAxMi40NSAyMC40NzYgMTAuODY2IDMuMDkgMTkuMzMxLTQuMzEgMTkuMzMxLTQuMzEiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48L2c+PC9zdmc+)]"
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>
              {dayjs(item.created_at * 1000).format("YYYY-MM-DD")}
            </CardDescription>
          </CardHeader>
          <Button variant="link">
            查看公告
            <ArrowBigRight />
          </Button>
        </Card>
      ))}
    </>
  );
}
