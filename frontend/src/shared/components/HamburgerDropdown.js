import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost, fetchMyPosts, fetchPosts } from '../../store/slices/postSlice';

const DropdownMenu = ({ postId, userEmail}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deletePost(postId));
        dispatch(fetchMyPosts());
    }
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                border={'none'}
                bgColor={'rgb(0,0,0,0)'}
                icon={<MoreVertIcon />}
                variant='unstyled'
                aria-label='Options'
                cursor='pointer'
                fontSize='1.5em'
                fontWeight='bold'
                color='#999'
                p={0}
                m={0}
                position='absolute'
                top='5px'
                right='5px'
                _hover={{ color: '#555' }}
            />
            <MenuList
                border={'none'}
                bgColor='black'
                p={2}
                minWidth='150px'
            >
                <MenuItem
                    border={'none'}
                    bgColor='black'

                    // justifyContent='center'
                    py={2}
                    cursor='pointer'
                    _hover={{ bgColor: 'gray.700' }}
                    onClick={handleDelete}
                >
                    <DeleteForeverIcon mr={2} /> Delete Post
                </MenuItem>
                <MenuItem
                    border={'none'}

                    bgColor='black'
                    // justifyContent='center'
                    py={2}
                    cursor='pointer'
                    _hover={{ bgColor: 'gray.700' }}
                >
                    <EditIcon mr={2} /> Edit Post
                </MenuItem>
                <MenuItem
                    border='none'
                    bgColor='black'
                    // justifyContent='center'
                    py={2}
                    cursor='pointer'
                    _hover={{ bgColor: 'gray.700' }}
                >
                    <SaveIcon mr={2} /> Save Post
                </MenuItem>
                <MenuItem
                    border='none'
                    bgColor='black'
                    // justifyContent='center'
                    py={2}
                    cursor='pointer'
                    _hover={{ bgColor: 'gray.700' }}
                >
                    <InfoIcon mr={2} /> Info
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default DropdownMenu;
