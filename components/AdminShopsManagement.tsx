"use client"
import Image from "next/image";
import { useState } from "react";
import {
  Store,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Search,
  MapPin,
  Phone,
  Mail,
  Building,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export type ShopDocumentStatus = "pending" | "validated" | "refused" | "missing";

export interface ShopDocument {
  id: string;
  type:
    | "business_license"
    | "food_safety_cert"
    | "insurance"
    | "lease_agreement"
    | "kbis"
    | "sanitary_authorization";
  name: string;
  uploadedAt: string;
  expiryDate?: string;
  status: ShopDocumentStatus;
  url: string;
  adminComment?: string;
}

export interface ShopForValidation {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  siret?: string;
  legalName?: string;
  vatNumber?: string;
  imageUrl?: string;
  createdAt: string;
  status: "pending" | "validated" | "refused" | "incomplete";
  documents: ShopDocument[];
  adminMessage?: string;
  openingHours?: Array<{
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }>;
}

interface AdminShopsManagementProps {
  shops: ShopForValidation[];
  onValidateShop: (shopId: string, comment?: string) => void;
  onRefuseShop: (shopId: string, comment: string) => void;
  onValidateDocument: (shopId: string, documentId: string, comment?: string) => void;
  onRefuseDocument: (shopId: string, documentId: string, comment: string) => void;
  onRequestMoreInfo: (shopId: string, comment: string) => void;
}

export function AdminShopsManagement({
  shops,
  onValidateShop,
  onRefuseShop,
  onValidateDocument,
  onRefuseDocument,
  onRequestMoreInfo,
}: AdminShopsManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedShops, setExpandedShops] = useState<Set<string>>(new Set());
  const [selectedShop, setSelectedShop] = useState<ShopForValidation | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<ShopDocument | null>(null);
  const [actionType, setActionType] = useState<
    "validate-shop" | "refuse-shop" | "validate-doc" | "refuse-doc" | "request-info" | null
  >(null);
  const [adminComment, setAdminComment] = useState("");

  // Filter shops
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || shop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleShopExpansion = (shopId: string) => {
    const newExpanded = new Set(expandedShops);
    if (newExpanded.has(shopId)) {
      newExpanded.delete(shopId);
    } else {
      newExpanded.add(shopId);
    }
    setExpandedShops(newExpanded);
  };

  const handleShopAction = (
    shop: ShopForValidation,
    action: "validate-shop" | "refuse-shop" | "request-info"
  ) => {
    setSelectedShop(shop);
    setActionType(action);
    setAdminComment(shop.adminMessage || "");
  };

  const handleDocumentAction = (
    shop: ShopForValidation,
    document: ShopDocument,
    action: "validate-doc" | "refuse-doc"
  ) => {
    setSelectedShop(shop);
    setSelectedDocument(document);
    setActionType(action);
    setAdminComment("");
  };

  const handleConfirmAction = () => {
    if (!selectedShop) return;

    switch (actionType) {
      case "validate-shop":
        onValidateShop(selectedShop.id, adminComment);
        
      case "refuse-shop":
        if (!adminComment.trim()) {
         
        }
        onRefuseShop(selectedShop.id, adminComment);
       
      case "request-info":
        if (!adminComment.trim()) {
         
          return;
        }
        onRequestMoreInfo(selectedShop.id, adminComment);
      
        break;
      case "validate-doc":
        if (selectedDocument) {
          onValidateDocument(selectedShop.id, selectedDocument.id, adminComment);
      
        }
        break;
      case "refuse-doc":
        if (!adminComment.trim()) {
        
          return;
        }
        if (selectedDocument) {
          onRefuseDocument(selectedShop.id, selectedDocument.id, adminComment);
       
        break;
    }

    // Reset state
    setSelectedShop(null);
    setSelectedDocument(null);
    setActionType(null);
    setAdminComment("");
  };
}

  const getDocumentTypeLabel = (type: ShopDocument["type"]) => {
    const labels = {
      business_license: "Licence commerciale",
      food_safety_cert: "Certificat d'hygiène alimentaire",
      insurance: "Assurance professionnelle",
      lease_agreement: "Bail commercial",
      kbis: "Extrait KBIS",
      sanitary_authorization: "Autorisation sanitaire",
    };
    return labels[type];
  };

  const getDocumentStatusColor = (status: ShopDocumentStatus) => {
    const colors = {
      pending: "bg-orange-500",
      validated: "bg-green-500",
      refused: "bg-red-500",
      missing: "bg-gray-400",
    };
    return colors[status];
  };

  const getShopStatusColor = (status: ShopForValidation["status"]) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800 border-orange-300",
      validated: "bg-green-100 text-green-800 border-green-300",
      refused: "bg-red-100 text-red-800 border-red-300",
      incomplete: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[status];
  };

  const isDocumentExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isDocumentExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  return (
    <div className="space-y-[24px]">
      {/* Header */}
      <div>
        <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
          Gestion des Boutiques
        </h1>
        <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
          Validez les informations et documents des boutiques
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[12px] p-[20px]">
        <div className="flex gap-[16px] items-center">
          <div className="relative flex-1">
            <Search className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-[#6b7280]" />
            <Input
              placeholder="Rechercher par nom, catégorie ou adresse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-[40px] font-['Space_Grotesk']"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] font-['Space_Grotesk']">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="validated">Validées</SelectItem>
              <SelectItem value="refused">Refusées</SelectItem>
              <SelectItem value="incomplete">Incomplètes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Shops List */}
      <div className="space-y-[16px]">
        {filteredShops.length === 0 ? (
          <div className="bg-white rounded-[12px] p-[48px] text-center">
            <Store className="w-[48px] h-[48px] text-[#6b7280] mx-auto mb-[16px]" />
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              Aucune boutique trouvée
            </p>
          </div>
        ) : (
          filteredShops.map((shop) => {
            const isExpanded = expandedShops.has(shop.id);
            const pendingDocs = shop.documents.filter(
              (doc) => doc.status === "pending"
            ).length;
            const validatedDocs = shop.documents.filter(
              (doc) => doc.status === "validated"
            ).length;
            const refusedDocs = shop.documents.filter(
              (doc) => doc.status === "refused"
            ).length;
            const expiredDocs = shop.documents.filter((doc) =>
              isDocumentExpired(doc.expiryDate)
            ).length;

            return (
              <Collapsible
                key={shop.id}
                open={isExpanded}
                onOpenChange={() => toggleShopExpansion(shop.id)}
              >
                <div className="bg-white rounded-[12px] border border-[#e5e7eb]">
                  {/* Shop Header */}
                  <div className="p-[24px]">
                    <div className="flex items-start justify-between mb-[16px]">
                      <div className="flex items-start gap-[16px] flex-1">
                        {shop.imageUrl && (
                          <Image
                            src={shop.imageUrl}
                            alt={shop.name}
                            className="w-[64px] h-[64px] rounded-[8px] object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-[12px] mb-[8px]">
                            <h3 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f]">
                              {shop.name}
                            </h3>
                            <Badge
                              className={`font-['Space_Grotesk'] text-[11px] px-[8px] py-[2px] ${getShopStatusColor(
                                shop.status,
                              )}`}
                              variant="outline"
                            >
                              {shop.status === "pending" && "En attente"}
                              {shop.status === "validated" && "Validée"}
                              {shop.status === "refused" && "Refusée"}
                              {shop.status === "incomplete" && "Incomplète"}
                            </Badge>
                            <Badge
                              className="font-['Space_Grotesk'] text-[11px] px-[8px] py-[2px] bg-blue-100 text-blue-800 border-blue-300"
                              variant="outline"
                            >
                              {shop.category}
                            </Badge>
                          </div>
                          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[12px]">
                            {shop.description}
                          </p>
                          <div className="grid grid-cols-2 gap-[12px]">
                            {shop.address && (
                              <div className="flex items-start gap-[8px]">
                                <MapPin className="w-[16px] h-[16px] text-[#6b7280] shrink-0 mt-[2px]" />
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                                  {shop.address}
                                </span>
                              </div>
                            )}
                            {shop.phone && (
                              <div className="flex items-center gap-[8px]">
                                <Phone className="w-[16px] h-[16px] text-[#6b7280]" />
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                                  {shop.phone}
                                </span>
                              </div>
                            )}
                            {shop.email && (
                              <div className="flex items-center gap-[8px]">
                                <Mail className="w-[16px] h-[16px] text-[#6b7280]" />
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                                  {shop.email}
                                </span>
                              </div>
                            )}
                            {shop.siret && (
                              <div className="flex items-center gap-[8px]">
                                <Building className="w-[16px] h-[16px] text-[#6b7280]" />
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                                  SIRET: {shop.siret}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-[8px]">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-['Space_Grotesk']"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-[16px] h-[16px] mr-[6px]" />
                                Réduire
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-[16px] h-[16px] mr-[6px]" />
                                Détails
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>

                    {/* Document Stats */}
                    <div className="flex gap-[16px] mb-[16px] pb-[16px] border-b border-[#e5e7eb]">
                      <div className="flex items-center gap-[8px]">
                        <Clock className="w-[16px] h-[16px] text-orange-500" />
                        <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                          {pendingDocs} docs en attente
                        </span>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                        <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                          {validatedDocs} docs validés
                        </span>
                      </div>
                      {refusedDocs > 0 && (
                        <div className="flex items-center gap-[8px]">
                          <XCircle className="w-[16px] h-[16px] text-red-500" />
                          <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                            {refusedDocs} docs refusés
                          </span>
                        </div>
                      )}
                      {expiredDocs > 0 && (
                        <div className="flex items-center gap-[8px]">
                          <AlertCircle className="w-[16px] h-[16px] text-red-500" />
                          <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                            {expiredDocs} docs expirés
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Admin Message */}
                    {shop.adminMessage && (
                      <div className="flex items-start gap-[12px] p-[12px] bg-orange-50 rounded-[8px] border border-orange-200 mb-[16px]">
                        <AlertCircle className="w-[16px] h-[16px] text-orange-600 shrink-0 mt-[2px]" />
                        <div>
                          <p className="font-['Space_Grotesk'] text-[12px] text-orange-900 font-medium mb-[4px]">
                            Message administrateur
                          </p>
                          <p className="font-['Space_Grotesk'] text-[12px] text-orange-800">
                            {shop.adminMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {shop.status === "pending" && (
                      <div className="flex gap-[8px]">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white font-['Space_Grotesk']"
                          onClick={() =>
                            handleShopAction(shop, "validate-shop")
                          }
                        >
                          <CheckCircle2 className="w-[14px] h-[14px] mr-[6px]" />
                          Valider la boutique
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="font-['Space_Grotesk']"
                          onClick={() => handleShopAction(shop, "refuse-shop")}
                        >
                          <XCircle className="w-[14px] h-[14px] mr-[6px]" />
                          Refuser
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="font-['Space_Grotesk']"
                          onClick={() => handleShopAction(shop, "request-info")}
                        >
                          <AlertCircle className="w-[14px] h-[14px] mr-[6px]" />
                          Demander des infos
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content - Documents */}
                  <CollapsibleContent>
                    <div className="px-[24px] pb-[24px] border-t border-[#e5e7eb] pt-[20px]">
                      <h4 className="font-['Space_Grotesk'] text-[16px] text-[#1f1f1f] mb-[16px]">
                        Documents ({shop.documents.length})
                      </h4>

                      {shop.documents.length === 0 ? (
                        <div className="text-center py-[24px]">
                          <FileText className="w-[32px] h-[32px] text-[#6b7280] mx-auto mb-[8px]" />
                          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                            Aucun document fourni
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-[12px]">
                          {shop.documents.map((document) => {
                            const expired = isDocumentExpired(
                              document.expiryDate,
                            );
                            const expiringSoon = isDocumentExpiringSoon(
                              document.expiryDate,
                            );

                            return (
                              <div
                                key={document.id}
                                className={`flex items-center justify-between p-[16px] rounded-[8px] border ${
                                  expired
                                    ? "bg-red-50 border-red-300"
                                    : expiringSoon
                                      ? "bg-yellow-50 border-yellow-300"
                                      : "bg-[#f9fafb] border-[#e5e7eb]"
                                }`}
                              >
                                <div className="flex items-center gap-[12px] flex-1">
                                  <div className="w-[40px] h-[40px] rounded-[6px] bg-white flex items-center justify-center border border-[#e5e7eb]">
                                    <FileText className="w-[20px] h-[20px] text-[#6b7280]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-[8px] mb-[4px]">
                                      <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                                        {getDocumentTypeLabel(document.type)}
                                      </p>
                                      <div
                                        className={`w-[8px] h-[8px] rounded-full ${getDocumentStatusColor(
                                          document.status,
                                        )}`}
                                      />
                                    </div>
                                    <div className="flex items-center gap-[12px] text-[12px] text-[#6b7280]">
                                      <div className="flex items-center gap-[4px]">
                                        <Calendar className="w-[12px] h-[12px]" />
                                        <span className="font-['Space_Grotesk']">
                                          Téléchargé le{" "}
                                          {new Date(
                                            document.uploadedAt,
                                          ).toLocaleDateString("fr-FR")}
                                        </span>
                                      </div>
                                      {document.expiryDate && (
                                        <div
                                          className={`flex items-center gap-[4px] ${
                                            expired
                                              ? "text-red-600"
                                              : expiringSoon
                                                ? "text-yellow-700"
                                                : ""
                                          }`}
                                        >
                                          <AlertCircle className="w-[12px] h-[12px]" />
                                          <span className="font-['Space_Grotesk']">
                                            {expired
                                              ? "Expiré le"
                                              : expiringSoon
                                                ? "Expire le"
                                                : "Valide jusqu'au"}{" "}
                                            {new Date(
                                              document.expiryDate,
                                            ).toLocaleDateString("fr-FR")}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {document.adminComment && (
                                      <div className="flex items-start gap-[6px] mt-[8px] p-[8px] bg-white rounded-[4px] border border-orange-200">
                                        <AlertCircle className="w-[14px] h-[14px] text-orange-600 shrink-0 mt-[2px]" />
                                        <p className="font-['Space_Grotesk'] text-[12px] text-orange-800">
                                          {document.adminComment}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-[8px]">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="font-['Space_Grotesk']"
                                    onClick={() =>
                                      window.open(document.url, "_blank")
                                    }
                                  >
                                    <Eye className="w-[14px] h-[14px] mr-[6px]" />
                                    Voir
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="font-['Space_Grotesk']"
                                  >
                                    <Download className="w-[14px] h-[14px]" />
                                  </Button>

                                  {document.status === "pending" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white font-['Space_Grotesk']"
                                        onClick={() =>
                                          handleDocumentAction(
                                            shop,
                                            document,
                                            "validate-doc",
                                          )
                                        }
                                      >
                                        <CheckCircle2 className="w-[14px] h-[14px] mr-[6px]" />
                                        Valider
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        className="font-['Space_Grotesk']"
                                        onClick={() =>
                                          handleDocumentAction(
                                            shop,
                                            document,
                                            "refuse-doc",
                                          )
                                        }
                                      >
                                        <XCircle className="w-[14px] h-[14px] mr-[6px]" />
                                        Refuser
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Opening Hours (if available) */}
                      {shop.openingHours && shop.openingHours.length > 0 && (
                        <div className="mt-[24px] pt-[24px] border-t border-[#e5e7eb]">
                          <h4 className="font-['Space_Grotesk'] text-[16px] text-[#1f1f1f] mb-[12px]">
                            Horaires d'ouverture
                          </h4>
                          <div className="grid grid-cols-2 gap-[8px]">
                            {shop.openingHours.map((schedule, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-[8px] bg-[#f9fafb] rounded-[6px]"
                              >
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#1f1f1f]">
                                  {schedule.day}
                                </span>
                                <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                                  {schedule.closed
                                    ? "Fermé"
                                    : `${schedule.open} - ${schedule.close}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })
        )}
      </div>

      {/* Action Dialog */}
      <Dialog
        open={actionType !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActionType(null);
            setSelectedShop(null);
            setSelectedDocument(null);
            setAdminComment("");
          }
        }}
      >
        <DialogContent className="font-['Space_Grotesk']">
          <DialogHeader>
            <DialogTitle>
              {actionType === "validate-shop" && "Valider la boutique"}
              {actionType === "refuse-shop" && "Refuser la boutique"}
              {actionType === "request-info" && "Demander des informations"}
              {actionType === "validate-doc" && "Valider le document"}
              {actionType === "refuse-doc" && "Refuser le document"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "validate-shop" &&
                "Confirmez la validation de cette boutique."}
              {actionType === "refuse-shop" &&
                "Indiquez la raison du refus de cette boutique."}
              {actionType === "request-info" &&
                "Indiquez les informations manquantes."}
              {actionType === "validate-doc" && "Confirmez la validation de ce document."}
              {actionType === "refuse-doc" &&
                "Indiquez la raison du refus de ce document."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-[16px]">
            <div className="p-[12px] bg-[#f9fafb] rounded-[8px] mb-[16px]">
              <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[4px]">
                <strong>Boutique :</strong> {selectedShop?.name}
              </p>
              {selectedDocument && (
                <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                  <strong>Document :</strong>{" "}
                  {getDocumentTypeLabel(selectedDocument.type)}
                </p>
              )}
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] block mb-[8px]">
                Commentaire{" "}
                {(actionType === "refuse-shop" ||
                  actionType === "refuse-doc" ||
                  actionType === "request-info") &&
                  "(obligatoire)"}
              </label>
              <Textarea
                placeholder={
                  actionType === "validate-shop" || actionType === "validate-doc"
                    ? "Commentaire optionnel..."
                    : actionType === "request-info"
                    ? "Indiquez les informations manquantes..."
                    : "Expliquez la raison du refus..."
                }
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                className="font-['Space_Grotesk']"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setActionType(null);
                setSelectedShop(null);
                setSelectedDocument(null);
                setAdminComment("");
              }}
              className="font-['Space_Grotesk']"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmAction}
              className={
                actionType === "validate-shop" || actionType === "validate-doc"
                  ? "bg-green-600 hover:bg-green-700 text-white font-['Space_Grotesk']"
                  : actionType === "request-info"
                  ? "bg-[#FFBF00] hover:bg-[#e6ac00] text-[#1a1d29] font-['Space_Grotesk']"
                  : "bg-red-600 hover:bg-red-700 text-white font-['Space_Grotesk']"
              }
            >
              {actionType === "validate-shop" || actionType === "validate-doc"
                ? "Valider"
                : actionType === "request-info"
                ? "Envoyer la demande"
                : "Refuser"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
