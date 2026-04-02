<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
      <span>신고서 작성</span>
    </section>
    <section class="page">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <strong>사고 신고자 기본 정보</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>제조사</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="postData.manufacturer" 
                  disabled />
              </td>
              <th>담당자</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="postData.name" 
                  disabled />
              </td>
            </tr>
            <tr>
              <th>전자우편</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="postData.email" 
                  disabled />
              </td>
              <th>연락처</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="postData.phone" 
                  disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>사고 접수 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="3">사고 일시</th>
              <th class="required">사이버보안 사고 발생 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.accidentDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.accidentTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">사이버보안 사고 감지 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.detectDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.detectTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">최초 사이버보안 사고 신고 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.incidentDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.incidentTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="7">사고유형 및 정도</th>
              <th>안전사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 사망자0명, 중상자2명, 경상자1명"
                      v-model="postData.safetyAccDesc"
                      :disabled="checkboxNone.safetyAccNone"
                    />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="safetyAccCheckbox" 
                      v-model="checkboxNone.safetyAccNone" />
                    <label for="safetyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>개인정보사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 주민번호 유출 5만 건 / 즐겨찾기 및 위치정보 유출 13건"
                      v-model="postData.privacyAccDesc"
                      :disabled="checkboxNone.privacyAccNone"
                    />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="privacyAccCheckbox" 
                      v-model="checkboxNone.privacyAccNone" />
                    <label for="privacyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>금융피해사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 결제 정보 3,500던 고용, 피해 약 1.2억 원"
                      v-model="postData.financeAccDesc"
                      :disabled="checkboxNone.financeAccNone"
                    />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="financeAccCheckbox" 
                      v-model="checkboxNone.financeAccNone" />
                    <label for="financeAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>차량운영피해사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 차량 운영 불가 2만대, 차량 부분 기능 장애 1만대"
                      v-model="postData.vehOpAccDesc"
                      :disabled="checkboxNone.vehOpAccNone"
                    />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="vehOpAccCheckbox" 
                      v-model="checkboxNone.vehOpAccNone" />
                    <label for="vehOpAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>기타 (차량 관련 시스템 피해 사고)</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 차량 교통 혼잡고 안내 서비스 장애 10만대 7시간"
                      v-model="postData.etcAccDesc"
                      :disabled="checkboxNone.etcAccNone"
                    />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="etcAccCheckbox" 
                      v-model="checkboxNone.etcAccNone" />
                    <label for="etcAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">정보통신망법 침해사고 해당여부</th>
              <td class="select">
                <select v-model.number="postData.isNetworkLawViol" required>
                  <option disabled value="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">미디어 노출 여부 (링크 or 정보)</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 없음" 
                  v-model="postData.mediaExposureInfo" />
              </td>
            </tr>
            <tr>
              <th rowspan="5">피해 시스템</th>
              <th class="required">차종</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) X차종 (차종)" 
                  v-model="postData.vehType" />
              </td>
            </tr>
            <tr>
              <th class="required">연식</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 2024년형 (연식 정보)" 
                  v-model="postData.vehYear" />
              </td>
            </tr>
            <tr>
              <th class="required">부품/시스템</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="예) AVN22, AVN23 (부품/시스템 명)"
                  v-model="postData.partSysNm"
                />
              </td>
            </tr>
            <tr>
              <th class="required">부품 모델명/모델번호</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="예) AVN22 (부품 모델명 or 모델번호)"
                  v-model="postData.partModelNm"
                />
              </td>
            </tr>
            <tr>
              <th class="required">(차량 외부)서비스 시스템</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 교통 정보 시스템" 
                  v-model="postData.extSys" />
              </td>
            </tr>
            <tr>
              <th rowspan="3">피해 범위</th>
              <th class="required">(식별된) 피해 차량 대수</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 15대" 
                  v-model="postData.dmgVehCnt" />
              </td>
            </tr>
            <tr>
              <th class="required">(식별된) 피해 사람 수</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 0명" 
                  v-model="postData.dmgPrsnCnt" />
              </td>
            </tr>
            <tr>
              <th class="required">(식별된) 피해 발생 시간(종료,계속)</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 7시간 (종료)" 
                  v-model="postData.dmgDurHour" />
              </td>
            </tr>
            <tr>
              <th rowspan="2">잠재적 피해 범위</th>
              <th class="required">잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="예) X차종 2022년형 12만대, Y차종 2023년형 21만대"
                  v-model="postData.potentialVehDesc"
                />
              </td>
            </tr>
            <tr>
              <th class="required">잠재 피해 대상 사람 수</th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 0명" 
                  v-model="postData.potentialPrsnCnt" />
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">조치계획(안) 제출 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.plantDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.planTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 1차 사고 분석 결과 및 향후 조치 계획 보고"
                      v-model="postData.planSubmitDesc"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">조치 완료 목표 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.targetDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.targetTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input
                      type="text"
                      placeholder="예) 1차 사고 분석 결과 및 향후 조치 계획 보고"
                      v-model="postData.targetCompleteDesc"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">신고 내용</th>
              <td class="textarea">
                <textarea 
                  placeholder="내용을 간단하게 입력하세요" 
                  v-model="postData.incidentReportContent"></textarea>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td class="file">
                <form @submit.prevent="postfetch_incident_receipt_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="incidentReceiptData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="line" @click="router.push({ name: 'katri_management' })">취소</button>
        <button class="line" @click="openTempConfirm" :disabled="!isAllInput">임시 저장</button>
        <button @click="openSaveConfirm" :disabled="!isAllInput">신고서 저장</button>
      </article>

      <!-- Modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();
const store = useAppStore();

// KATRI 사고 신고서 전송 데이터 상태값
const postData = ref({
  manufacturer: "타타대우모빌리티",
  status: "NEW",
  name: "홍길동",
  email: "test@tata-daewoo.com",
  phone: "***-****-****",
  accidentDate: "",
  detectDate: "",
  incidentDate: "",
  safetyAccDesc: "",
  privacyAccDesc: "",
  financeAccDesc: "",
  vehOpAccDesc: "",
  etcAccDesc: "",
  isNetworkLawViol: 0,
  mediaExposureInfo: "",
  vehType: "",
  vehYear: "",
  partSysNm: "",
  partModelNm: "",
  extSys: "",
  dmgVehCnt: "",
  dmgPrsnCnt: "",
  dmgDurHour: "",
  potentialVehDesc: "",
  potentialPrsnCnt: "",
  planSubmitDesc: "",
  planSubmitDate: "",
  targetCompleteDesc: "",
  targetCompleteDate: "",
  incidentReportContent: "",
  fileAction: {
    fileType: "INCIDENT",
    fileIdList: [],
    deleteFileIdList: null,
  }
})

// 해당사항 없음 체크 상태값
const checkboxNone = ref({
  safetyAccNone: false,
  privacyAccNone: false,
  financeAccNone: false,
  vehOpAccNone: false,
  etcAccNone: false,
})

// 날짜, 시간 따로 입력하는 데이터 상태값
const inputDateTime = ref({
  accidentDate: "",
  accidentTime: "",
  detectDate: "",
  detectTime: "",
  incidentDate: "",
  incidentTime: "",
  plantDate: "",
  planTime: "",
  targetDate: "",
  targetTime: "",
})

// KATRI 사고 신고서 POST 필수 요소 (안전사고, 개인정보사고, 금융피해사고, 차량운영피해사고, 기타 항목 제외)
const requireData = [
  "manufacturer",
  "status",
  "name",
  "email",
  "phone",
  "accidentDate",
  "detectDate",
  "incidentDate",
  "isNetworkLawViol",
  "mediaExposureInfo",
  "vehType",
  "vehYear",
  "partSysNm",
  "partModelNm",
  "extSys",
  "dmgVehCnt",
  "dmgPrsnCnt",
  "dmgDurHour",
  "potentialVehDesc",
  "potentialPrsnCnt",
  "planSubmitDesc",
  "planSubmitDate",
  "targetCompleteDesc",
  "targetCompleteDate",
  "incidentReportContent",
];

// 사용자가 필수 요소를 입력하지 않으면 버튼 비활성화
const isAllInput = computed(() => {
  postData.value.accidentDate = `${inputDateTime.value.accidentDate} ${inputDateTime.value.accidentTime}`;
  postData.value.detectDate = `${inputDateTime.value.detectDate} ${inputDateTime.value.detectTime}`;
  postData.value.incidentDate = `${inputDateTime.value.incidentDate} ${inputDateTime.value.incidentTime}`;
  postData.value.planSubmitDate = `${inputDateTime.value.plantDate} ${inputDateTime.value.planTime}`;
  postData.value.targetCompleteDate = `${inputDateTime.value.targetDate} ${inputDateTime.value.targetTime}`;

  return requireData.every((key) => {
    const value = postData.value[key];
    return value !== null && value !== undefined && value !== "";
  })
})

// 해당사항 없음 체크박스 활성화 시 해당 데이터를 NULL로 처리
const checkboxMapping = {
  safetyAccDesc: "safetyAccNone",
  privacyAccDesc: "privacyAccNone",
  financeAccDesc: "financeAccNone",
  vehOpAccDesc: "vehOpAccNone",
  etcAccDesc: "etcAccNone",
}

watch(
  () => checkboxNone.value,
  (flags) => {
    for(const [textKey, checkKey] of Object.entries(checkboxMapping)) {
      if(flags[checkKey]) {
        postData.value[textKey] = null;
      } else if (postData.value[textKey] === null) {
        postData.value[textKey] = "";
      }
    }
  },
  { deep: true }
)

// KATRI 사고 신고서 저장 API 호출
const postfetch_katri_new = async() => {
  try {
    const res = await axios.post('/api/vsoc/incident',postData.value);
    if(res.data.resultCode === -1){
      alert('데이터 전송 실패');
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// KATRI 사고 신고서 임시 저장 API 호출
const postfetch_katri_temp = async() => {
  postData.value.status = "TEMP";
  try {
    const res = await axios.post('/api/vsoc/incident',postData.value);
    if(res.data.resultCode === -1){
      alert('데이터 임시 전송 실패');
    } else {
      openTempDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 임시 전송 실패')
  }
}

// Modal 
const goList = () => router.push({ name: "katri_management" });

const openSaveConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "신고서를 저장하시겠습니까?",

    rightBtn: async() => {
      await postfetch_katri_new();
    },
  })
};

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "저장 되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openTempConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "임시 저장 하시겠습니까?",

    rightBtn: async() => {
      await postfetch_katri_temp();
    },
  })
};

const openTempDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "임시 저장 되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 테스트 (현재 DLP 파일 반출 보안 문제로 file은 제외하고 테스트)
const incidentReceiptData = ref({
  fileType: "INCIDENT",
  fileCategory: "RECEIPT_DATA",
  // file: null,
})

const onFileChange = (e) => {
  incidentReceiptData.value.file = e.target.files[0];
}

const postfetch_incident_receipt_file = async() => {
  const formData = new FormData();
  formData.append("fileType",incidentReceiptData.value.fileType);
  formData.append("fileCategory",incidentReceiptData.value.fileCategory);
  // formData.append("file",incidentReceiptData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.fileAction.fileIdList.push(fileId);
    console.log(postData.value.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}
//

</script>

<style scoped>
</style>