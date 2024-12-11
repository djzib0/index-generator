import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
    const publicDirectory = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDirectory);

    return {
        props: {
            files,
        },
    };
}

const FileList = ({ files }) => {
    return (
        <div>
            <h1>Files in Public Directory</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
