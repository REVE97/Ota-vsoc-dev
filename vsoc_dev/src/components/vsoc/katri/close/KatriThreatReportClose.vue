<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
      <span>위협 신고서 종료</span>
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
              <td>{{ getData?.manufacturer }}</td>
              <th>담당자</th>
              <td>{{ getData?.name }}</td>
            </tr>
            <tr>
              <th>전자우편</th>
              <td>{{ getData?.email }}</td>
              <th>연락처</th>
              <td>{{ getData?.phone }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>위협 신고 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th class="required">신고 내용</th>
              <td colspan="2" class="textarea">
                <textarea placeholder="신고 내용을 입력해주세요." v-model="getData.incidentReportContent" disabled></textarea>
              </td>
              <td colspan="1" class="textarea">
                <textarea placeholder="신고 내용을 입력해주세요." v-model="postData.incidentReportContent"></textarea>
              </td>
            </tr>
            <tr>
              <th rowspan="2">위협 일시</th>
              <th class="required">사이버보안 위협 발생 일시</th>
              <td class="input">
               <input type="text" v-model="getData.threatOccurrenceDate" disabled>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.occurDate"
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
                      v-model="inputDateTime.occurTime"
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
              <th class="required">사이버보안 위협 감지 일시</th>
              <td class="input">
                <input type="text" v-model="getData.threatDetectionDate" disabled> 
              </td>
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
              <th rowspan="4">위협 유형 및 정도</th>
              <th class="required">위협 유형 (STRID+S)</th>
              <td class="input">
                <input type="text" placeholder="STRIDE+S 분류 체계에 따른 위협 유형 입력" v-model="getData.threatType" disabled>
              </td>
               <td class="input">
                <input type="text" placeholder="STRIDE+S 분류 체계에 따른 위협 유형 입력" v-model="postData.threatType">
              </td>
            </tr>
            <tr>
              <th class="required">정보통신망법 침해사고 해당여부</th>
              <td class="select">
                <select v-model="getData.isNetworkLawViolation" disabled>
                  <option value="" disabled="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
              <td class="select">
                <select v-model="postData.isNetworkLawViolation" required>
                  <option value="" disabled="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">위협 감지 방법</th>
              <td class="input">
                <input type="text" placeholder="예) IDS탐지 / 운영 로그 정보" v-model="getData.detectionMethod" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="예) IDS탐지 / 운영 로그 정보" v-model="postData.detectionMethod">
              </td>
            </tr>
            <tr>
              <th class="required">위협 정보 출처 (링크or정보)</th>
              <td class="input">
                <input type="text" placeholder="사고 위협 정보를 최초 전달한 내부•외부 출처" v-model="getData.infoSource" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="사고 위협 정보를 최초 전달한 내부•외부 출처" v-model="postData.infoSource">
              </td>
            </tr>
            <tr>
              <th rowspan="4">위협 대상</th>
              <th class="required">위협 대상 구분</th>
              <td class="select">
                <select v-model="getData.targetCategory" disabled>
                  <option value="" disabled>선택</option>
                  <option value="차량 관련 위협">차량 관련 위협</option>
                  <option value="생산라인 위협">생산라인 위협</option>
                  <option value="백엔드 시스템 위협">백엔드 시스템 위협</option>
                </select>
              </td>
              <td class="select">
                <select v-model="postData.targetCategory">
                  <option value="" disabled>선택</option>
                  <option value="차량 관련 위협">차량 관련 위협</option>
                  <option value="생산라인 위협">생산라인 위협</option>
                  <option value="백엔드 시스템 위협">백엔드 시스템 위협</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">차종</th>
              <td class="input">
                <input type="text" placeholder="예) X차종 2022년형" v-model="getData.vehModel" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="예) X차종 2022년형" v-model="postData.vehModel">
              </td>
            </tr>
            <tr>
              <th class="required">부품/시스템</th>
              <td class="input">
                <input type="text" placeholder="예) AVN22, AVN23 (부품명,모델명)" v-model="getData.partSystem" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="예) AVN22, AVN23 (부품명,모델명)" v-model="postData.partSystem">
              </td>
            </tr>
            <tr>
              <th class="required">(차량 외부)서비스 시스템</th>
              <td class="input">
                <input type="text" placeholder="차량 외부의 서비스 시스템 입력" v-model="getData.serviceSystem" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="차량 외부의 서비스 시스템 입력" v-model="postData.serviceSystem">
              </td>
            </tr>
            <tr>
              <th rowspan="3">위협 범위</th>
              <th class="required">위협 노출 차량 대수</th>
              <td class="input">
                <input type="text" placeholder="예) 200" v-model="getData.affectedVehCnt" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="예) 200" v-model="postData.affectedVehCnt">
              </td>
            </tr>
            <tr>
              <th class="required">위협 노출 사람 수</th>
              <td class="input">
                <input type="text" placeholder="예) 300" v-model="getData.affectedPersonCnt" disabled>
              </td>
              <td class="input">
                <input type="text" placeholder="예) 300" v-model="postData.affectedPersonCnt">
              </td>
            </tr>
            <tr>
              <th class="required">위협 발생 시간 (종료,계속)</th>
              <td class="input">
                <input type="text" placeholder="예) 2026-02-05  02:10-02:45" v-model="getData.threatOccurrenceTime" disabled>
              </td>
              <td>
                <div class="input calendar">
                    <Datepicker
                      v-model="postData.threatOccurrenceTime"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
              </td>
            </tr>
            <tr>
              <th class="required">위협 내용</th>
              <td colspan="2" class="textarea">
                <textarea placeholder="예) 공격자가 악성 펌웨어 업로드" v-model="getData.threatContent" disabled></textarea>
              </td>
              <td colspan="1" class="textarea">
                <textarea placeholder="예) 공격자가 악성 펌웨어 업로드" v-model="postData.threatContent"></textarea>
              </td>
            </tr>
            <tr>
              <th class="required">위협 방어/조치 내용</th>
              <td colspan="2" class="textarea">
                <textarea placeholder="예) 펌웨어 서명 검증 적용" v-model="getData.remedyContent" disabled></textarea>
              </td>
              <td colspan="1" class="textarea">
                <textarea placeholder="예) 펌웨어 서명 검증 적용" v-model="postData.remedyContent"></textarea>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="2">{{ getData.fileList?.[0].fileCategoryDescription }}</td>
              <td class="file" colspan="1">
                <form @submit.prevent="postfetch_incidentThreat_threat_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="incidentThreatData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onThreatFileChange" />
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
        <button class="line" @click="router.push({ name: 'katri_management' })">목록</button>
        <button @click="openFinishConfirm" :disabled="!isAllInput">종료</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();
const route = useRoute();
const store = useAppStore();

// 위협 신고서 작성 전체 데이터 
const postData = ref({
  id: route.params.id,
  manufacturer: "벤츠",
  name: "테스트",
  email: "test@knowledgepoint.co.kr",
  phone: "***-****-****",
  status: "NEW",
  incidentReportContent: "",
  threatOccurrenceDate: "",
  threatDetectionDate: "",
  threatType: "",
  isNetworkLawViolation: 0,
  detectionMethod: "",
  infoSource: "",
  targetCategory: "",
  vehModel: "",
  partSystem: "",
  serviceSystem: "",
  affectedVehCnt: "",
  affectedPersonCnt: "",
  threatOccurrenceTime: "",
  threatContent: "",
  remedyContent: "",
  fileAction: {
    fileType: "INCIDENT_THREAT",
    fileIdList: [],
    deleteFileIdList: null,
  },
})

// 위협 일시 날짜/시간 따로 받는 데이터 상태값
const inputDateTime = ref({
  occurDate: "",
  occurTime: "",
  detectDate: "",
  detectTime: "",
})

// KATRI 위협 신고서 갱신을 위한 기존 상세조회 전체 데이터
const getData = ref({
  incidentReportContent: "",
  threatOccurrenceDate: "",
  threatDetectionDate: "",
  threatType: "",
  isNetworkLawViolation: null,
  detectionMethod: "",
  infoSource: "",
  targetCategory: "",
  vehModel: "",
  partSystem: "",
  serviceSystem: "",
  affectedVehCnt: "",
  affectedPersonCnt: "",
  threatOccurrenceTime: "",
  threatContent: "",
  remedyContent: "",
});

// POST 필수 요소 배열
const requireData = [
  "manufacturer",
  "name",
  "email",
  "phone",
  "status",
  "incidentReportContent",
  "threatOccurrenceDate",
  "threatDetectionDate",
  "threatType",
  "isNetworkLawViolation",
  "detectionMethod",
  "infoSource",
  "targetCategory",
  "vehModel",
  "partSystem",
  "serviceSystem",
  "affectedVehCnt",
  "affectedPersonCnt",
  "threatOccurrenceTime",
  "threatContent",
  "remedyContent",
];

// 사용자가 필수 요소를 입력하지 않으면 버튼 비활성화 
const isAllInput = computed(() => {
  postData.value.threatOccurrenceDate = `${inputDateTime.value.occurDate} ${inputDateTime.value.occurTime}`;
  postData.value.threatDetectionDate = `${inputDateTime.value.detectDate} ${inputDateTime.value.detectTime}`;

  return requireData.every((key) => {
    const value = postData.value[key];
    return value !== null && value !== undefined && value !== "";
  })
})

// KATRI 위협 신고서 종료 API 호출
const postfetch_threat_close = async() => {
  try {
    postData.value.status = "FINISH";
    const res = await axios.post('/api/vsoc/incident/threat',postData.value);
    if(res.data.resultCode === -1){
      alert('데이터 전송 실패');
    } else{
      openFinishDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// KATRI 위협 신고서 상세조회 API 호출
const getfetch_threat_detail = async() => {
  try {
    const incidentId = Number(route.params.id);
    const res = await axios.get(`/api/vsoc/incident/${incidentId}/THREAT`);
    getData.value = res.data.data.incidentThreat;

    if(res.data.resultCode === -1){
      alert('데이터 불러오기 실패');
    }
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패')
  }
}

// Modal 
const goList = () => {
  router.push({
    name: 'katri_threat_detail',
    params: { id: route.params.id },
  })
}

const openFinishConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "신고서를 종료 하시겠습니까?",

    rightBtn: async() => {
      await postfetch_threat_close();
    },
  })
};

const openFinishDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "종료 되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 테스트 (현재 DLP 파일 반출 보안 문제로 file은 제외하고 테스트)
const incidentThreatData = ref({
  fileType: "INCIDENT_THREAT",
  fileCategory: "THREAT_DATA",
  // file: null,
})

const onThreatFileChange = (e) => {
  incidentThreatData.value.file = e.target.files[0];
}

const postfetch_incidentThreat_threat_file = async() => {
  const formData = new FormData();
  formData.append("fileType",incidentThreatData.value.fileType);
  formData.append("fileCategory",incidentThreatData.value.fileCategory);
  // formData.append("file",incidentThreatData.value.file);
  
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

onMounted(getfetch_threat_detail);
</script>