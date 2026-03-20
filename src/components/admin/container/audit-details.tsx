import { TActionHistory } from "@/types/global";

type TProps = {
   audit: TActionHistory
}

const AuditDetails = ({ audit }: TProps) => {
   const { action, oldData, newData, createdAt, user } = audit;

   const renderChanges = () => {
      if (!oldData && newData) {
         return (
            <div>
               <h4>Data de Publicação</h4>
               {Object.entries(newData).map(([key, value]) => (
                  <div key={key}>
                     <strong>{key}:</strong> {String(value)}
                  </div>
               ))}
            </div>
         );
      }

      if (oldData && newData) {
         return (
            <div>
               <h4>Campos Atualizados</h4>
               {Object.keys(newData).map((key) => {
                  const oldValue = oldData[key];
                  const newValue = newData[key];

                  if (oldValue !== newValue) {
                     return (
                        <div key={key} style={{ marginBottom: 8 }}>
                           <strong>{key}</strong>
                           <div>
                              <span style={{ color: "red" }}>
                                 {String(oldValue)}
                              </span>{" "}
                              →{" "}
                              <span style={{ color: "green" }}>
                                 {String(newValue)}
                              </span>
                           </div>
                        </div>
                     );
                  }

                  return null;
               })}
            </div>
         );
      }

      if (oldData && !newData) {
         return (
            <div>
               <h4>Dados Eliminados</h4>
               {Object.entries(oldData).map(([key, value]) => (
                  <div key={key}>
                     <strong>{key}:</strong> {String(value)}
                  </div>
               ))}
            </div>
         );
      }

      return null;
   };

   return (
      <div className="p-4 border rounded-lg shadow-sm ">
         <div className="mb-4">
            <p><strong>Acção:</strong> {action}</p>
            <p><strong>Data:</strong> {new Date(createdAt).toLocaleString()}</p>
            <p>
               <strong>Útilizador:</strong> {user?.name ?? "Sistema"}
            </p>
         </div>

         <div>{renderChanges()}</div>
      </div>
   );
}

export default AuditDetails
