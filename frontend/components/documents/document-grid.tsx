import { useState } from 'react';
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

interface DocumentGridProps {
  documents: Document[];
  onUpdate: (document: Document) => void;
}

export function DocumentGrid({ documents, onUpdate }: DocumentGridProps) {
  const [contextMenu, setContextMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-4xl text-red-500" />;
      case 'doc':
        return <FaFileWord className="text-4xl text-blue-500" />;
      case 'xls':
        return <FaFileExcel className="text-4xl text-green-500" />;
      case 'ppt':
        return <FaFilePowerpoint className="text-4xl text-orange-500" />;
      case 'img':
        return <FaFileImage className="text-4xl text-purple-500" />;
      default:
        return <FaFilePdf className="text-4xl text-gray-500" />;
    }
  };

  const handleContextMenu = (e: React.MouseEvent, documentId: string) => {
    e.preventDefault();
    setContextMenu({
      id: documentId,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleStarDocument = (doc: Document) => {
    onUpdate({ ...doc, starred: !doc.starred });
  };

  const handleShareDocument = (doc: Document) => {
    onUpdate({ ...doc, shared: !doc.shared });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          onContextMenu={(e) => handleContextMenu(e, doc.id)}
        >
          <div className="card-body">
            <div className="flex items-start justify-between">
              {getFileIcon(doc.type)}
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
            </div>

            <h2 className="card-title text-sm mt-2">{doc.name}</h2>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{doc.size}</span>
              <span>{new Date(doc.modified).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {doc.starred && <FaStar className="text-yellow-500" />}
              {doc.shared && <FaShare className="text-blue-500" />}
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {doc.tags.map((tag) => (
                <span key={tag} className="badge badge-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 