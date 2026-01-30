// import { useState } from "react";
// import {
//   User,
//   FileText,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Download,
//   Eye,
//   Search,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Textarea } from "./ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "./ui/dialog";
// import { Badge } from "./ui/badge";

// export type DocumentStatus = "pending" | "validated" | "refused" | "missing";

// export interface UserDocument {
//   id: string;
//   type: "identity" | "address_proof" | "bank_details" | "business_registration";
//   name: string;
//   uploadedAt: string;
//   status: DocumentStatus;
//   url: string;
//   adminComment?: string;
// }

// export interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   role: "manager" | "partner";
//   phone?: string;
//   createdAt: string;
//   status: "pending" | "validated" | "incomplete";
//   documents: UserDocument[];
// }

// interface AdminUsersViewProps {
//   users: UserProfile[];
//   onValidateDocument: (userId: string, documentId: string, comment?: string) => void;
//   onRefuseDocument: (userId: string, documentId: string, comment: string) => void;
//   onValidateUser: (userId: string) => void;
// }

// export function AdminUsersView({
//   users,
//   onValidateDocument,
//   onRefuseDocument,
//   onValidateUser,
// }: AdminUsersViewProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//   const [selectedDocument, setSelectedDocument] = useState<UserDocument | null>(null);
//   const [actionType, setActionType] = useState<"validate" | "refuse" | null>(null);
//   const [adminComment, setAdminComment] = useState("");

//   // Filter users
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || user.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleDocumentAction = (
//     user: UserProfile,
//     document: UserDocument,
//     action: "validate" | "refuse"
//   ) => {
//     setSelectedUser(user);
//     setSelectedDocument(document);
//     setActionType(action);
//     setAdminComment("");
//   };

//   const handleConfirmAction = () => {
//     if (!selectedUser || !selectedDocument) return;

//     if (actionType === "validate") {
//       onValidateDocument(selectedUser.id, selectedDocument.id, adminComment);

//     } else if (actionType === "refuse") {
//       if (!adminComment.trim()) {

//         return;
//       }
//       onRefuseDocument(selectedUser.id, selectedDocument.id, adminComment);

//     }

//     setSelectedUser(null);
//     setSelectedDocument(null);
//     setActionType(null);
//     setAdminComment("");
//   };

//   const handleValidateCompleteUser = (user: UserProfile) => {
//     const allValidated = user.documents.every((doc) => doc.status === "validated");
//     if (!allValidated) {
//       toast.error("Tous les documents doivent être validés avant de valider l'utilisateur");
//       return;
//     }
//     onValidateUser(user.id);
//     toast.success(`Utilisateur ${user.name} validé avec succès`);
//   };

//   const getDocumentTypeLabel = (type: UserDocument["type"]) => {
//     const labels = {
//       identity: "Pièce d'identité",
//       address_proof: "Justificatif de domicile",
//       bank_details: "RIB",
//       business_registration: "Extrait KBIS",
//     };
//     return labels[type];
//   };

//   const getDocumentStatusColor = (status: DocumentStatus) => {
//     const colors = {
//       pending: "bg-orange-500",
//       validated: "bg-green-500",
//       refused: "bg-red-500",
//       missing: "bg-gray-400",
//     };
//     return colors[status];
//   };

//   const getDocumentStatusLabel = (status: DocumentStatus) => {
//     const labels = {
//       pending: "En attente",
//       validated: "Validé",
//       refused: "Refusé",
//       missing: "Manquant",
//     };
//     return labels[status];
//   };

//   const getUserStatusColor = (status: UserProfile["status"]) => {
//     const colors = {
//       pending: "bg-orange-100 text-orange-800 border-orange-300",
//       validated: "bg-green-100 text-green-800 border-green-300",
//       incomplete: "bg-gray-100 text-gray-800 border-gray-300",
//     };
//     return colors[status];
//   };

//   return (
//     <div className="space-y-[24px]">
//       {/* Header */}
//       <div>
//         <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
//           Gestion des Utilisateurs
//         </h1>
//         <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
//           Validez les documents des utilisateurs pour activer leur compte
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-[12px] p-[20px]">
//         <div className="flex gap-[16px] items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-[#6b7280]" />
//             <Input
//               placeholder="Rechercher par nom ou email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-[40px] font-['Space_Grotesk']"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-[200px] font-['Space_Grotesk']">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Tous les statuts</SelectItem>
//               <SelectItem value="pending">En attente</SelectItem>
//               <SelectItem value="validated">Validés</SelectItem>
//               <SelectItem value="incomplete">Incomplets</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Users List */}
//       <div className="space-y-[16px]">
//         {filteredUsers.length === 0 ? (
//           <div className="bg-white rounded-[12px] p-[48px] text-center">
//             <User className="w-[48px] h-[48px] text-[#6b7280] mx-auto mb-[16px]" />
//             <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
//               Aucun utilisateur trouvé
//             </p>
//           </div>
//         ) : (
//           filteredUsers.map((user) => {
//             const pendingDocs = user.documents.filter(
//               (doc) => doc.status === "pending"
//             ).length;
//             const validatedDocs = user.documents.filter(
//               (doc) => doc.status === "validated"
//             ).length;
//             const refusedDocs = user.documents.filter(
//               (doc) => doc.status === "refused"
//             ).length;

//             return (
//               <div
//                 key={user.id}
//                 className="bg-white rounded-[12px] p-[24px] border border-[#e5e7eb]"
//               >
//                 {/* User Header */}
//                 <div className="flex items-start justify-between mb-[20px]">
//                   <div className="flex items-start gap-[16px]">
//                     <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FFBF00] flex items-center justify-center shrink-0">
//                       <User className="w-[24px] h-[24px] text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[4px]">
//                         {user.name}
//                       </h3>
//                       <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[8px]">
//                         {user.email}
//                       </p>
//                       <div className="flex items-center gap-[8px]">
//                         <Badge
//                           className={`font-['Space_Grotesk'] text-[11px] px-[8px] py-[2px] ${getUserStatusColor(
//                             user.status
//                           )}`}
//                           variant="outline"
//                         >
//                           {user.status === "pending" && "En attente"}
//                           {user.status === "validated" && "Validé"}
//                           {user.status === "incomplete" && "Incomplet"}
//                         </Badge>
//                         <Badge
//                           className="font-['Space_Grotesk'] text-[11px] px-[8px] py-[2px] bg-blue-100 text-blue-800 border-blue-300"
//                           variant="outline"
//                         >
//                           {user.role === "manager" ? "Manager" : "Partenaire"}
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>

//                   {user.status !== "validated" && (
//                     <Button
//                       onClick={() => handleValidateCompleteUser(user)}
//                       disabled={user.documents.some(
//                         (doc) => doc.status !== "validated"
//                       )}
//                       className="bg-[#FFBF00] hover:bg-[#e6ac00] text-[#1a1d29] font-['Space_Grotesk']"
//                     >
//                       <CheckCircle2 className="w-[16px] h-[16px] mr-[8px]" />
//                       Valider l'utilisateur
//                     </Button>
//                   )}
//                 </div>

//                 {/* Document Stats */}
//                 <div className="flex gap-[16px] mb-[20px] pb-[20px] border-b border-[#e5e7eb]">
//                   <div className="flex items-center gap-[8px]">
//                     <Clock className="w-[16px] h-[16px] text-orange-500" />
//                     <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
//                       {pendingDocs} en attente
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-[8px]">
//                     <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
//                     <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
//                       {validatedDocs} validés
//                     </span>
//                   </div>
//                   {refusedDocs > 0 && (
//                     <div className="flex items-center gap-[8px]">
//                       <XCircle className="w-[16px] h-[16px] text-red-500" />
//                       <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
//                         {refusedDocs} refusés
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Documents List */}
//                 <div className="space-y-[12px]">
//                   {user.documents.map((document) => (
//                     <div
//                       key={document.id}
//                       className="flex items-center justify-between p-[16px] bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb]"
//                     >
//                       <div className="flex items-center gap-[12px] flex-1">
//                         <div className="w-[40px] h-[40px] rounded-[6px] bg-white flex items-center justify-center border border-[#e5e7eb]">
//                           <FileText className="w-[20px] h-[20px] text-[#6b7280]" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-[8px] mb-[4px]">
//                             <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
//                               {getDocumentTypeLabel(document.type)}
//                             </p>
//                             <div
//                               className={`w-[8px] h-[8px] rounded-full ${getDocumentStatusColor(
//                                 document.status
//                               )}`}
//                             />
//                             <span className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
//                               {getDocumentStatusLabel(document.status)}
//                             </span>
//                           </div>
//                           <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
//                             Téléchargé le{" "}
//                             {new Date(document.uploadedAt).toLocaleDateString("fr-FR")}
//                           </p>
//                           {document.adminComment && (
//                             <div className="flex items-start gap-[6px] mt-[8px] p-[8px] bg-orange-50 rounded-[4px] border border-orange-200">
//                               <AlertCircle className="w-[14px] h-[14px] text-orange-600 shrink-0 mt-[2px]" />
//                               <p className="font-['Space_Grotesk'] text-[12px] text-orange-800">
//                                 {document.adminComment}
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-[8px]">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="font-['Space_Grotesk']"
//                           onClick={() => window.open(document.url, "_blank")}
//                         >
//                           <Eye className="w-[14px] h-[14px] mr-[6px]" />
//                           Voir
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="font-['Space_Grotesk']"
//                         >
//                           <Download className="w-[14px] h-[14px]" />
//                         </Button>

//                         {document.status === "pending" && (
//                           <>
//                             <Button
//                               size="sm"
//                               className="bg-green-600 hover:bg-green-700 text-white font-['Space_Grotesk']"
//                               onClick={() =>
//                                 handleDocumentAction(user, document, "validate")
//                               }
//                             >
//                               <CheckCircle2 className="w-[14px] h-[14px] mr-[6px]" />
//                               Valider
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               className="font-['Space_Grotesk']"
//                               onClick={() =>
//                                 handleDocumentAction(user, document, "refuse")
//                               }
//                             >
//                               <XCircle className="w-[14px] h-[14px] mr-[6px]" />
//                               Refuser
//                             </Button>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Action Dialog */}
//       <Dialog
//         open={actionType !== null}
//         onOpenChange={(open) => {
//           if (!open) {
//             setActionType(null);
//             setSelectedUser(null);
//             setSelectedDocument(null);
//             setAdminComment("");
//           }
//         }}
//       >
//         <DialogContent className="font-['Space_Grotesk']">
//           <DialogHeader>
//             <DialogTitle>
//               {actionType === "validate" ? "Valider le document" : "Refuser le document"}
//             </DialogTitle>
//             <DialogDescription>
//               {actionType === "validate"
//                 ? "Confirmez la validation de ce document."
//                 : "Indiquez la raison du refus de ce document."}
//             </DialogDescription>
//           </DialogHeader>

//           {selectedDocument && (
//             <div className="py-[16px]">
//               <div className="p-[12px] bg-[#f9fafb] rounded-[8px] mb-[16px]">
//                 <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[4px]">
//                   <strong>Utilisateur :</strong> {selectedUser?.name}
//                 </p>
//                 <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
//                   <strong>Document :</strong>{" "}
//                   {getDocumentTypeLabel(selectedDocument.type)}
//                 </p>
//               </div>

//               <div>
//                 <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] block mb-[8px]">
//                   Commentaire {actionType === "refuse" && "(obligatoire)"}
//                 </label>
//                 <Textarea
//                   placeholder={
//                     actionType === "validate"
//                       ? "Commentaire optionnel..."
//                       : "Expliquez pourquoi ce document est refusé..."
//                   }
//                   value={adminComment}
//                   onChange={(e) => setAdminComment(e.target.value)}
//                   className="font-['Space_Grotesk']"
//                   rows={4}
//                 />
//               </div>
//             </div>
//           )}

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setActionType(null);
//                 setSelectedUser(null);
//                 setSelectedDocument(null);
//                 setAdminComment("");
//               }}
//               className="font-['Space_Grotesk']"
//             >
//               Annuler
//             </Button>
//             <Button
//               onClick={handleConfirmAction}
//               className={
//                 actionType === "validate"
//                   ? "bg-green-600 hover:bg-green-700 text-white font-['Space_Grotesk']"
//                   : "bg-red-600 hover:bg-red-700 text-white font-['Space_Grotesk']"
//               }
//             >
//               {actionType === "validate" ? "Valider" : "Refuser"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
