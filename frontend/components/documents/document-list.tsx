import { Document } from '@/app/(dashboard)/documents/page';
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFilePowerpoint, 
  FaFileImage,
  FaStar,
  FaShare,
  FaEllipsisV
} from 'react-icons/fa';

interface DocumentListProps {
  documents: Document[];
  onUpdate: (document: Document) => void;
}

export function DocumentList({ documents, onUpdate }: DocumentListProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'doc':
        return <FaFileWord className="text-blue-500" />;
      case 'xls':
        return <FaFileExcel className="text-green-500" />;
      case 'ppt':
        return <FaFilePowerpoint className="text-orange-500" />;
      case 'img':
        return <FaFileImage className="text-purple-500" />;
      default:
        return <FaFilePdf className="text-gray-500" />;
    }
  };

  const handleStarDocument = (doc: Document) => {
    onUpdate({ ...doc, starred: !doc.starred });
  };

  const handleShareDocument = (doc: Document) => {
    onUpdate({ ...doc, shared: !doc.shared });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
            <th>Owner</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="hover">
              <td className="flex items-center gap-2">
                {getFileIcon(doc.type)}
                <span>{doc.name}</span>
                <div className="flex items-center gap-1">
                  {doc.starred && <FaStar className="text-yellow-500" />}
                  {doc.shared && <FaShare className="text-blue-500" />}
                </div>
              </td>
              <td className="uppercase">{doc.type}</td>
              <td>{doc.size}</td>
              <td>{new Date(doc.modified).toLocaleDateString()}</td>
              <td>{doc.owner}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="badge badge-sm">{tag}</span>
                  ))}
                </div>
              </td>
              <td>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                    <FaEllipsisV />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <button onClick={() => handleStarDocument(doc)}>
                        {doc.starred ? 'Unstar' : 'Star'}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleShareDocument(doc)}>
                        {doc.shared ? 'Unshare' : 'Share'}
                      </button>
                    </li>
                    <li><button>Download</button></li>
                    <li><button>Rename</button></li>
                    <li><button className="text-error">Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 