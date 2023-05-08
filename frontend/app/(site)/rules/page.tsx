"use client"

import Link from "next/link"

import { Htag } from "@/components/Htag/Htag"
import { LayoutVideo } from "@/components/Layot.video"
import { RuleComponent } from "@/components/rules/rule.component"

const PageRules = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl rounded-3xl">Правила сообщества</h1>
      <RuleComponent>
        {" "}
        <Htag type={"h1"} className="font-bold">
          Введение
        </Htag>
      </RuleComponent>
    </div>
  )
}

export default PageRules
