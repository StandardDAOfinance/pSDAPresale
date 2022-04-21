import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.psdapresale.financial/contact-us',
      },
      {
        label: t('Brand'),
        href: 'https://docs.psdapresale.financial/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/psdapresale',
      },
      {
        label: t('Community'),
        href: 'https://docs.psdapresale.financial/contact-us/telegram',
      },
      {
        label: t('PSDA token'),
        href: 'https://docs.psdapresale.financial/tokenomics/cake',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.psdapresale.financial/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.psdapresale.financial/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.psdapresale.financial/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/psdapresale',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.psdapresale.financial',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://app.gitbook.com/@psdapresale-1/s/psdapresale/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.psdapresale.financial/help/faq#is-psdapresale-safe-has-psdapresale-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.psdapresale.financial/hiring/become-a-chef',
      },
    ],
  },
]
