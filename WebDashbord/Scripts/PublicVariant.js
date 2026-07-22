var dataGroup = {};
var dashbordData = [];
var publicData = {};
var loginData = {};

var valueDropDownKalaExf = null;
var LinkFDocADocUri;
var DeleteDocInUseUri;
var SaveDocInUseUri;
var TimeUri;
var SendEmailUri;
var SmsandEmailUri;
var DocInUseUri;
var LinkFDocIDocUri;
var LinkIDocADocUri;
var LinkIDocFDocUri;
var VstrUri;
var AccountUri;
var ParamUri;
var ChangeDatabaseUri;
var ChangeDatabaseConfigUri;
var DatabseSalUrl;
var AccessUri;
var AccessReportUri;
var AccessReportErjUri;
var CountTableUri;
var RprtColsSaveUri;
var LogOutUri;
var LoginTestUri;
var RprtColsUri;
var RprtColsDefultUri;
var PrintFormsUri;
var DeletePrintFormUri;
var SavePrintFormUri;
var TestSavePrintFormUri;
var SelectedPrintFormUri;
var SelectedAccessGhimatPrintFormUri;
var MessageUri;
var DateUri;
var DictionaryUri;
var V_Del_ADocUri;
var LogXUri;
var SaveADoc_RelatedGroupUri;
var SaveFDoc_RelatedGroupUri;
var SaveFDoc_SamaneMakeDocUri;


const apiKeyMap = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIn0.eyJhdWQiOiIxOTQxOCIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIiwiaWF0IjoxNjYyODk3ODA5LCJuYmYiOjE2NjI4OTc4MDksImV4cCI6MTY2NTU3OTgwOSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qdEbX0m4jziLci0rpJVVgqFre-z9z2AjopNmAW8RmKJq4qBaLyUMa81YzTby7-GD9enq_G_-598xDnZup3H5yR2XbxmaT4QhZoOz6lDfY68t-_fffH8AQja-VdY0OBpkiTUg4AP4Ta-lexE5LLINqNbJCvwJV0sHyBPHTkbv1pb1Ax5nU_lLAbFwDJZ_5l9_H6mNVwR5d4xQGCKWPnVYQQG6Vukqh_iajIJ-YGDNIuP3fOQlBz4XPdUwzAzNIibW_yioMcRIm38kfxqFqePc6ZpI4zyb4HWx4maIWYYx2GRf4uFNZiB7gcWtyksNZppTKav8f9Rlv6D7xWqsntLUKA";
const notAccess = "Not access to the method";

const key_F1 = 112;
const key_F2 = 113;
const key_F3 = 114;
const key_F4 = 115;
const key_F5 = 116;
const key_F6 = 117;
const key_F7 = 118;
const key_F8 = 119;
const key_F9 = 120;
const key_F10 = 121;
const key_F11 = 122;
const key_F12 = 123;
const key_Space = 32;
const key_BackSpace = 8;
const key_Enter = 13;
const key_Esc = 27;
const key_Insert = 45;
const key_Delete = 46;
const key_R = 82;
const key_O = 79;
const key_P = 80;
const key_a = 97;
const key_b = 98;



const countAccess = 38;
// دسترسی های ادمین پنل
const AP_SFCT = 0;
const AP_SPFCT = 1;
const AP_SRFCT = 2;
const AP_PFCT = 3;
const AP_PPFCT = 4;
const AP_PRFCT = 5;
const AP_IIDOC = 6;
const AP_IODOC = 7;
const AP_TrzIKala = 8;
const AP_TrzIKalaExf = 9;
const AP_IDocR = 10;
const AP_FDocR_S = 11;
const AP_FDocR_P = 12;
const AP_TrzAcc = 13;
const AP_Dftr = 14;
const AP_ADocR = 15;
const AP_TChk = 16;
const AP_TrzFKala_S = 17;
const AP_TrzFKala_P = 18;
const AP_TrzFCust_S = 19;
const AP_TrzFCust_P = 20;
const AP_ADOC = 21;
const AP_SFORD = 22;
const AP_SHVL = 23;
const AP_SEXT = 24;
const AP_PFORD = 25;
const AP_Krdx = 26;
const AP_Kala = 27;
const AP_Cust = 28;
const AP_Acc = 29;
const AP_Mkz = 30;
const AP_Opr = 31;
const AP_AGMkz = 32;
const AP_AGOpr = 33;
const AP_Arz = 34;
const AP_ZAcc = 35;
const AP_GrdZAcc = 36;
const AP_KhlAcc = 37;
const AP_KhlZAcc = 38;

// دسترسی های  ویندوزی
const AC_DOC = 0;
const AC_FSDOC = 1;
const AC_FPDOC = 2;
const AC_SPDOC = 3;
const AC_SFDOC = 4;
const AC_SRDOC = 5;
const AC_PPDOC = 6;
const AC_PFDOC = 7;
const AC_PRDOC = 8;
const AC_IIDOC = 9;
const AC_IODOC = 10;
const AC_RPRT = 11;
const AC_TrzIKala = 12;
const AC_TrzIKalaExf = 13;
const AC_IDocR = 14;
const AC_FDocR_S = 15;
const AC_FDocR_P = 16;
const AC_TrzAcc = 17;
const AC_Dftr = 18;
const AC_ADocR = 19;
const AC_TChk = 20;
const AC_TrzFKala_S = 21;
const AC_TrzFKala_P = 22;
const AC_TrzFCust_S = 23;
const AC_TrzFCust_P = 24;
const AC_ADOC = 25;
const AC_SFORD = 26;
const AC_SHVL = 27;
const AC_SEXT = 28;
const AC_PFORD = 29;
const AC_Krdx = 30;
const AC_KALA = 31;
const AC_CUST = 32;
const AC_ACC = 33;
const AC_MKZ = 34;
const AC_OPR = 35;
const AC_AGMkz = 36;
const AC_AGOpr = 37;
const AC_ARZ = 38;
const AC_ZACC = 39;
const AC_GrdZAcc = 40;
const AC_KhlAcc = 41;
const AC_KhlZAcc = 42;

const InvRegSave = "ثبت شده";
const InvRegNotSave = "ثبت نشد";
const FctRegSave = "ثبت شده";
const FctRegNotSave = "ثبت نشد";
const text_Add = 'جدید';
const text_Update = 'ویرایش';
const text_Delete = 'حذف';
const text_SettingColumn = 'تنظیم ستون ها';
const text_Refresh = 'به روز رسانی';
const text_Select = 'انتخاب';
const text_OtherField = 'مشخصات اضافی';
const text_LinkSanad = 'لینک اسناد';
const text_Date = 'انتخاب تاریخ';
const text_Image = 'تصویر';
const text_Location = 'موقعیت مکانی';
const text_FirstPage = 'اولین';
const text_PreviousPage = 'قبلی';
const text_NextPage = 'بعدی';
const text_LastPage = 'آخرین';
const text_Close = 'بستن';

var lang = 'en';
var dir_lang = 'ltr'

const prog_Inv = 'Inv5';
const prog_Fct = 'Fct5';
const prog_Acc = 'Acc5';
const prog_Afi = 'Afi1';
const prog_Erj = 'Erj1';

const prog_Web1 = "Web1";
const prog_Web2 = "Web2";
const prog_Web8 = "Web8";

const user_Param1 = 'u-Xe';
const user_Param2 = 'zqQ3';

const user_Ace = 'ACE';

const access_DOC = 'DOC';
const access_ADOC = 'ADOC';
const access_FSDOC = 'FSDOC';
const access_FPDOC = 'FPDOC';
const access_RPRT = 'RPRT';

var listModeDesktop = [];
var accessPublic = {};
var defultGroup;
var account_UserName;
var account_Password;
var userModeErj;


const _modeForosh = {
    "SORD": { "Web1": 0, "Web8": "SORD", value: "سفارش فروش", isForosh: true },
    "SPFCT": { "Web1": 51, "Web8": "SPFCT", value: "پیش فاکتور فروش", isForosh: true },
    "SFCT": { "Web1": 52, "Web8": "SFCT", value: "فاکتور فروش", isForosh: true },
    "SRFCT": { "Web1": 53, "Web8": "SRFCT", value: "برگشت از فروش", isForosh: true },
    "SHVL": { "Web1": 0, "Web8": "SHVL", value: "حواله فروش", isForosh: true },
    "SEXT": { "Web1": 0, "Web8": "SEXT", value: "برگه خروج", isForosh: true },
    "PORD": { "Web1": 0, "Web8": "PORD", value: "سفارش خرید", isForosh: false },
    "PPFCT": { "Web1": 54, "Web8": "PPFCT", value: "پیش فاکتور خرید", isForosh: false },
    "PFCT": { "Web1": 55, "Web8": "PFCT", value: "فاکتور خرید", isForosh: false },
    "PRFCT": { "Web1": 56, "Web8": "PRFCT", value: "برگشت از خرید", isForosh: false },
};

