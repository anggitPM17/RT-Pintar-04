import { HomePage } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { getHomePage, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { HomePagePayload, SettingsPayload } from 'types'

interface PageProps {
  page: HomePagePayload
  settings: SettingsPayload
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, preview } = props

  if (preview) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return <HomePage page={page} settings={settings} />
}

const fallbackPage: HomePagePayload = {
  title: '',
  overview: [],
  showcaseProjects: [],
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const token = previewData.token
  const [settings, page = fallbackPage] = await Promise.all([
    getSettings({ token }),
    getHomePage({ token }),
  ])

  return {
    props: {
      page,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}
