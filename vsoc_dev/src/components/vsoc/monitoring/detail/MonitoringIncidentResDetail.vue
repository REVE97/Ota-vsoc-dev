<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 상세 조회</span>
    </section>
    <section class="step button">
       <router-link 
        v-if="isValid?.eventReportId" 
        :to="{ name: 'monitoring_event_detail', params: { eventReportId: isValid.eventReportId } }">
        <button>Event Report</button>
      </router-link>
      <router-link 
        v-if="isValid?.weaknessReportId" 
        :to="{ name: 'monitoring_weakness_detail', params: { weaknessReportId: isValid.weaknessReportId } }">
        <button>Weakness Report</button>
      </router-link>
      <router-link 
        v-if="isValid?.vulnerabilityReportId" 
        :to="{ name: 'monitoring_vulner_detail', params: { vulnerabilityReportId: isValid.vulnerabilityReportId } }">
        <button>Vulnerability Report</button>
      </router-link>
      <button class="active">Cybersecurity Incident Response Report</button>
    </section>
    <section class="page">
      <article class="table">
        <strong>최초</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Cybersecurity Incident Response ID</th>
              <td colspan="3">{{ allData?.id }}</td>
            </tr>
            <tr>
              <th>사이버 보안 사고 발생 일시</th>
              <td>{{ getDate(allData?.occurrenceDate) }}</td>
              <th>사이버 보안 사고 감지 일시</th>
              <td>{{ getDate(allData?.detectionDate) }}</td>
            </tr>
            <tr>
              <th>안전사고</th>
              <td>{{ allData?.safetyIncident }}</td>
              <th>금융피해사고</th>
              <td>{{ allData?.financialDmg }}</td>
            </tr>
            <tr>
              <th>개인정보 사고</th>
              <td>{{ allData?.privacyIncident }}</td>
              <th>차량운영피해사고</th>
              <td>{{ allData?.vehicleOpDmg }}</td>
            </tr>
            <tr>
              <th>기타</th>
              <td>{{ allData?.etcSystemDmg }}</td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>피해 차종</th>
              <td>{{ allData?.affectedVehicleModel }}</td>
              <th>피해 발생 시간</th>
              <td>{{ allData?.dmgOccurrenceTime }}</td>
            </tr>
            <tr>
              <th>피해 부품/시스템</th>
              <td>{{ allData?.affectedPartSystem }}</td>
              <th>피해 차량 대수</th>
              <td>{{ allData?.affectedVehicleCount }}</td>
            </tr>
            <tr>
              <th>피해 서비스 시스템</th>
              <td>{{ allData?.affectedServiceSystem }}</td>
              <th>피해 사람 수</th>
              <td>{{ allData?.affectedPersonCount }}</td>
            </tr>
            <tr>
              <th>잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td>{{ allData?.potentialVehicleCount }}</td>
              <th>잠재 피해 대상 사람 수</th>
              <td>{{ allData?.potentialPersonCount }}</td>
            </tr>
            <tr>
              <th>정보통신망법 침해사고 해당여부</th>
              <td>{{ isNetworkParsing }}</td>
              <th>미디어 노출 여부</th>
              <td>
                <div class="group">
                  <div>{{ isMediaExposedParsing }} / </div>
                  <div>{{ allData?.isMediaExposedInfo }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>조치 계획(안) 제출 일시</th>
              <td>{{ getDate(allData?.submissionDate) }}</td>
              <th>조치 완료 목표 일시</th>
              <td>{{ getDate(allData?.targetCompletionDate) }}</td>
            </tr>
            <tr>
              <th>신고 내용</th>
              <td>{{ allData?.reportContent }}</td>
              <th>담당자</th>
              <td>{{ allData?.manager }}</td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td 
                colspan="3" 
                class="group"
                v-for="item in cyberInitEvidenceFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 절차, 역할 및 대응 일정 보고서</th>
              <td 
                colspan="3" 
                class="group"
                v-for="item in cyberInitProcedureFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td 
                colspan="3" 
                class="group"
                v-for="item in cyberInitPlanFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>공격자 정보</th>
              <td>{{ allData?.renewal?.attackerInfo }}</td>
              <th>공격 경로</th>
              <td>{{ allData?.renewal?.attackPath }}</td>
            </tr>
            <tr>
              <th>보안 특성/공격 유형</th>
              <td>{{ allData?.renewal?.attackType}}</td>
              <th>기본 보안 방안 기술</th>
              <td>{{ allData?.renewal?.securityMeasureTech }}</td>
            </tr>
            <tr>
              <th>사고 취약점 원인 분석</th>
              <td>{{ allData?.renewal?.vulCauseAnalysis }}</td>
              <th>관련 취약점 정보</th>
              <td>{{ allData?.renewal?.relatedVulInfo }}</td>
            </tr>
            <tr>
              <th>사고 공격 현실성/난이도 분석</th>
              <td>{{ allData?.renewal?.attackFeasibility }}</td>
              <th>관련 취약점 위험도</th>
              <td>{{ allData?.renewal?.relatedVulRisk }}</td>
            </tr>
            <tr>
              <th>대응/조치 후 예상 난이도 분석</th>
              <td>{{ allData?.renewal?.postActionDifficulty }}</td>
              <th>기준 평가 위험도</th>
              <td>{{ allData?.renewal?.standardEvalRisk }}</td>
            </tr>
            <tr>
              <th>금번 사고 위험도</th>
              <td>{{ allData?.renewal?.currentIncidentRisk }}</td>
              <th>대응/조치 후 목표 위험도</th>
              <td>{{ allData?.renewal?.targetRisk }}</td>
            </tr>
            <tr>
              <th>대응/조치 항목</th>
              <td>{{ allData?.renewal?.actionItem }}</td>
              <th>대응/조치 계획 일정</th>
              <td>{{ getDate(allData?.renewal?.actionPlanDate) }}</td>
            </tr>
            <tr>
              <th>대응/조치 내용</th>
              <td>{{ allData?.renewal?.actionContent }}</td>
              <th>대응/조치 현황</th>
              <td>{{ allData?.renewal?.actionStatus }}</td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td 
                colspan="3"
                class="group"
                v-for="item in cyberRenewalEvidenceFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td 
                colspan="3"
                class="group"
                v-for="item in cyberRenewalPlanFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>종료</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>대응/조치 항목</th>
              <td>{{ allData?.finish?.actionItem }}</td>
              <th>대응/조치 내용</th>
              <td>{{ allData?.finish?.actionContent }}</td>
            </tr>
            <tr>
              <th>대응/조치 계획 일정</th>
              <td>{{ getDate(allData?.finish?.actionPlanDate) }}</td>
              <th>대응/조치 현황</th>
              <td>{{ allData?.finish?.actionStatus }}</td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td 
                colspan="3" 
                class="group"
                v-for="item in cyberFinalEvidenceFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
            <tr>
              <th>사고 대응 보고서</th>
              <td 
                colspan="3" 
                class="group"
                v-for="item in cyberFinalReportFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
            <tr>
              <th>대응 책임자</th>
              <td>{{ allData?.finish?.responseManager }}</td>
              <th>대응 후 재평가 위험도</th>
              <td>{{ allData?.finish?.postReevalRisk }}</td>
            </tr>
          </tbody>
        </table>
      </article>
       <article class="group button">
        <button class="red line" @click="openDeleteConfirm">삭제</button>
        <router-link 
          :to="{ name: 'monitoring_cyber_update', params: { cyberReportId: route.params.cyberReportId } }">
          <button class="line">수정</button>
        </router-link>
        <button class="cancel" @click='router.push({ name: "monitoring_management" })'>목록</button>
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
import { getDate } from '@/common/common';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// 모니터링 리포트 사이버 리포트 상세조회 전체 데이터
const allData = ref(null);

// 버튼으로 이동하기 위한 리포트 데이터
const isValid = ref({
  eventReportId: "",
  weaknessReportId: "",
  vulnerabilityReportId: "",
  cyberReportId: "",
});

// 정보통신망법 침해사고 해당여부 파싱
const isNetworkParsing = computed(() => {
  if(allData?.value?.isNetworkLawViolation === 1) return "Y";
  if(allData?.value?.isNetworkLawViolation === 0) return "N";
})

// 미디어 노출 여부 파싱
const isMediaExposedParsing = computed(() => {
  if(allData?.value?.isMediaExposed === 1) return "Y";
  if(allData?.value?.isMediaExposed === 0) return "N";
})

// 사이버 리포트 파일 파싱
const cyberInitEvidenceFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 최초 증빙 자료")})

const cyberInitProcedureFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 최초 대응 절차/역할/일정 보고서")})

const cyberInitPlanFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 최초 대응 계획 보고서")})

const cyberRenewalPlanFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 갱신 대응 계획 보고서")})

const cyberRenewalEvidenceFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 갱신 증빙 자료")})

const cyberFinalEvidenceFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 종료 증빙 자료")})

const cyberFinalReportFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "사이버 리포트 종료 사고 대응 보고서")})

// 모니터링 리포트 사이버 리포트 상세조회 API 호출
const getfetch_cyber_detail = async() => {
  try {
    const cyberReportId = route.params.cyberReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/cyber/${cyberReportId}`);
    allData.value = res.data.data.report;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 해당 리포트 리스트 바로가는 버튼, 다음 리포트 작성 버튼 API 호출
const getfetch_button_link = async() => {
  try {
    const cyberReportId = Number(route.params.cyberReportId);
    const res = await axios.get('/api/vsoc/monitoring-report');
    isValid.value = res.data.data.monitoringReports.list.find((item)=>item.cyberReportId === cyberReportId);
    if(res.data.resultCode === -1){
      alert('버튼 데이터 불러오기 실패');
    }
  } catch (error) {
    console.error(error);
    alert('버튼 불러오기 실패');
  }
}

// 모니터링 리포트 사이버 리포트 상세조회 삭제 API 호출
const deletefetch_cyber_detail = async() => {
  try {
    const cyberReportId = route.params.cyberReportId;
    await axios.post(`/api/vsoc/monitoring-report/cyber/${cyberReportId}`);
  } catch (error) {
    console.error(error);
    alert('데이터 삭제 실패');
  }
}

// modal
const goList = () => router.replace({ name: "monitoring_management" });

const openDeleteConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "리포트를 삭제하시겠습니까?",

    rightBtn: async() => { 
      await deletefetch_cyber_detail();
      goList(); 
    },
  })
};

onMounted(() => {
  getfetch_cyber_detail();
  getfetch_button_link();
});
</script>