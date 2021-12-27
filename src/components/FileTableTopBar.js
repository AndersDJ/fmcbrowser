import SearchInput from '../components/SelectBox';
import UploadFiles from './UploadFiles';
import '../static/style/fileTopBar.css'
import DeleteButton from './DeleteButton';

function FileTableTopBar() {

    return (
        <div id='bread-buttons' className='clear-fix'>
            <SearchInput placeholder="input search text" style={{ width: 200 }} />
            <div className='top-buttons'>
                <>
                    <DeleteButton />
                    <UploadFiles />
                </>
            </div>
        </div>
    )
}

export default FileTableTopBar