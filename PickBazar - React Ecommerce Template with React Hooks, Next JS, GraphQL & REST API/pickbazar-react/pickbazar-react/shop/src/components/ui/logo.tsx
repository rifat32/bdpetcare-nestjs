import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } : any = useSettings();
  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-10 w-32 overflow-hidden md:w-40" style={{width: '10rem', height: '10rem'}}>
        <Image
          // src={logo?.original ?? logoPlaceholder}
          src={'http://bdpetcare.com/pos/img/1646725153.png'}
          alt={siteTitle || 'Bdpetcare Logo'}
          layout="fill"
          objectFit="contain"
          loading="eager"
     
        />
      </span>
    </Link>
  );
};

export default Logo;
