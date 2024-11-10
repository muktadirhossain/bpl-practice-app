'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'
import { usePathname } from 'next/navigation'

const BreadCrumbs = () => {
    const pathname = usePathname()
    const pathnames = pathname.split('/').filter(x => x);
    // console.log(pathnames)
    return (
        <Breadcrumbs>
            <BreadcrumbItem>home</BreadcrumbItem>
            {
                pathnames?.map((pathname, idx) => <BreadcrumbItem key={idx}>{pathname}</BreadcrumbItem>)
            }
        </Breadcrumbs>
    )
}

export default BreadCrumbs