import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Avatar from '../../../../components/Avatar';
import Link from 'next/link';
import Dropdown, { DropdownMenu, DropdownItem, DropdownToggle } from '../../../../components/bootstrap/Dropdown';
import { useProjectContext } from '../../../../context/projectContext';

const UserProfile = () => {
  const [show, setShow] = useState<boolean>(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const { backendToken } = useProjectContext();

  useEffect(() => {
    if (localStorage.getItem('backendToken')) {
      try {
        const storedUserName = localStorage.getItem('userName');
        const storedUserImage = localStorage.getItem('userImage');

        if (storedUserName) setUserName(storedUserName);
        if (storedUserImage) setUserImage(storedUserImage);
      } catch (error) {
        console.error('Error fetching user data from localStorage', error);
      }
    }
  }, [backendToken]);

  return (
    <div className="user-profile">
      <Dropdown className="c2d-dropdown" isOpen={show} setIsOpen={setShow} direction={'down'}>
        <DropdownToggle hasIcon={false}>
          <button
            className="btn btn-link p-0 text-decoration-none d-flex gap-3 align-items-center"
            role="button"
            onClick={() => setShow(!show)}>
            {userName}
            <Avatar src={userImage ? userImage : ''} size={42} className="profile-photo" />
          </button>
        </DropdownToggle>
        <DropdownMenu isAlignmentEnd size={'md'}>
          {/* <DropdownItem>
            <Link href={'/'}>FAQ</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href={'/'}>Contact Support</Link>
          </DropdownItem>
          <DropdownItem isDivider />
          <DropdownItem>
            <Link href={'/profile-settings'}>Profile</Link>
          </DropdownItem> */}
          <DropdownItem
            onClick={() => {
              signOut();
              localStorage.clear();
            }}>
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserProfile;
