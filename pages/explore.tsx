"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { useCollections } from "@/firebase/firestore/getCollections"
import { useToast } from "@/hooks/use-toast"
import copyToClipboard from "@/utils/copyToClipboard"
import delinearizeCode from "@/utils/delinearizeCode"
import highlight from "@/utils/highlight"
import indentCode from "@/utils/indentCode"
import { Copy, Github, Loader2, Share, Star } from "lucide-react"
import Prism from "prismjs"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToastAction } from "@/components/ui/toast"
import "prism-themes/themes/prism-one-dark.min.css"
import { useQuery } from "react-query"

import { siteConfig } from "@/config/site"
import CardCode from "@/components/card-code"
import Error from "@/components/error"
import { Layout } from "@/components/layout"
import Loader from "@/components/loader"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Explore() {
  const { toast } = useToast()

  const { data, isLoading, isError } = useCollections("codes")

  return (
    <Layout>
      <Head>
        <title>Sharuco | Explore</title>
        <meta
          name="description"
          content="Sharuco allows you to share code snippets that you have found
      useful."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-8 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-4xl">
            Discover little bits of code that can help you.
          </h1>
        </div>
        <div className="">
          {isLoading && <Loader />}
          {data && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1rem">
                {data.map(
                  (code: {
                    id: string
                    idAuthor: string
                    language: string
                    code: string
                    description: string
                    tags: string[]
                    favoris: string[]
                  }) => (
                    <CardCode
                      key={code.id}
                      id={code.id}
                      idAuthor={code.idAuthor}
                      language={code.language}
                      code={code.code}
                      description={code.description}
                      tags={code.tags}
                      favoris={code.favoris}
                    />
                  )
                )}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {isError && <Error />}
        </div>
      </section>
    </Layout>
  )
}
