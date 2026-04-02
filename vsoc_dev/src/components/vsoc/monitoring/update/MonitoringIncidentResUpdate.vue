<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 수정</span>
    </section>
    <section class="step">
      <ul>
        <li>
          <strong>Event Report</strong>
        </li>
        <li>
          <strong>Weakness Report</strong>
        </li>
        <li>
          <strong>Vulnerability Report</strong>
        </li>
        <li class="active">
          <strong>Cybersecurity Incident Response Report</strong>
        </li>
      </ul>
    </section>
    <section class="page">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
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
              <td colspan="3">{{ getData?.id }}</td>
            </tr>
            <tr>
              <th class="required">사이버 보안 사고 발생 일시</th>
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
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">사이버 보안 사고 감지 일시</th>
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
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">안전사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="신체적 피해 (부상·사망 등)로 이어질 수 있는 사고 여부와 세부 내용을 작성해주세요"
                  v-model="postData.data.safetyIncident"
                />
              </td>
              <th class="required">금융피해사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="결제·금융 정보 탈취 또는 부정 과금 등 경제적 피해 내용을 작성해주세요"
                  v-model="postData.data.financialDmg"
                />
              </td>
            </tr>
            <tr>
              <th class="required">개인정보 사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="개인 정보 (위치, 계정, 식별 정보 등) 유출·노출 여부와 세부 내용을 작성해주세요"
                  v-model="postData.data.privacyIncident"
                />
              </td>
              <th class="required">차량운영피해사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="차량 운행 불능·성능 저하 등 운용 상의 피해 여부를 작성해주세요"
                  v-model="postData.data.vehicleOpDmg"
                />
              </td>
            </tr>
            <tr>
              <th class="required">기타</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="서비스 플랫폼 장애 등 차량 관련 시스템 사고 내용을 작성해주세요"
                  v-model="postData.data.etcSystemDmg"
                />
              </td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th class="required">피해 차종</th>
              <td class="input">
                <input type="text" placeholder="차종을 입력해주세요" v-model="postData.data.affectedVehicleModel"/>
              </td>
              <th class="required">피해 발생 시간</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고기 지속된 구간(시작~종료)을 입력해주세요"
                  v-model="postData.data.dmgOccurrenceTime"
                />
              </td>
            </tr>
            <tr>
              <th class="required">피해 부품/시스템</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="부품/시스템 모델명을 입력해주세요"
                  v-model="postData.data.affectedPartSystem"
                />
              </td>
              <th class="required">피해 차량 대수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고 피해 차량 대수를 입력해주세요"
                  v-model="postData.data.affectedVehicleCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">피해 서비스 시스템</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="차량 외부의 서비스 시스템을 입력해주세요"
                  v-model="postData.data.affectedServiceSystem"
                />
              </td>
              <th class="required">피해 사람 수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고 피해 탑승자·사용자 수를 입력해주세요"
                  v-model="postData.data.affectedPersonCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="잠재적 사고 피해 차량 대수를 입력하세요."
                  v-model="postData.data.potentialVehicleCount"
                />
              </td>
              <th class="required">잠재 피해 대상 사람 수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="잠재적 사고 피해 탑승자, 사용자 수를 입력해주세요."
                  v-model="postData.data.potentialPersonCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">정보통신망법 침해사고 해당여부</th>
              <td class="select">
                <select v-model.number="postData.data.isNetworkLawViolation" required>
                  <option disabled value="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
              <th class="required">미디어 노출 여부</th>
              <td>
                <div class="group">
                  <div class="select">
                    <select v-model.number="postData.data.isMediaExposed" required>
                      <option disabled value="">선택</option>
                      <option value="1">Y</option>
                      <option value="0">N</option>
                    </select>
                  </div>
                  <div class="input"> 
                    <input type="text" placeholder="미디어 노출 정보를 입력해주세요" v-model="postData.data.isMediaExposedInfo"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">조치 계획(안) 제출 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.planDate"
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
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">조치 완료 목표 일시</th>
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
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">신고 내용</th>
              <td class="input">
                <input
                  type="text" placeholder="신고 내용에 대한 설명을 작성해주세요" v-model="postData.data.reportContent"/>
              </td>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_init_evidence_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitEvidenceData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 절차, 역할 및 대응 일정 보고서</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_init_procedure_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitProcedureData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_init_plan_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitPlanData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
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
              <th class="required">공격자 정보</th>
              <td class="input">
                <input type="text" placeholder="공격자 정보를 입력해주세요" v-model="postData.data.renewal.attackerInfo"/>
              </td>
              <th class="required">공격 경로</th>
              <td class="input">
                <input type="text" placeholder="공격 경로를 입력해주세요" v-model="postData.data.renewal.attackPath"/>
              </td>
            </tr>
            <tr>
              <th class="required">보안 특성/공격 유형</th>
              <td class="input">
                <input type="text" placeholder="보안 특성 / 공격 유형을 입력해주세요" v-model="postData.data.renewal.attackType"/>
              </td>
              <th class="required">기본 보안 방안 기술</th>
              <td class="input">
                <input type="text" placeholder="탐지에 사용된 솔루션·룰 등을 입력해주세요" v-model="postData.data.renewal.securityMeasureTech"/>
              </td>
            </tr>
            <tr>
              <th class="required">사고 취약점 원인 분석</th>
              <td class="input">
                <input type="text" placeholder="사고 발생 원인을 입력해주세요" v-model="postData.data.renewal.vulCauseAnalysis"/>
              </td>
              <th class="required">관련 취약점 정보</th>
              <td class="input">
                <input type="text" placeholder="연관된 공개 취약점 ID·링크를 입력해주세요" v-model="postData.data.renewal.relatedVulInfo"/>
              </td>
            </tr>
            <tr>
              <th class="required">사고 공격 현실성/난이도 분석</th>
              <td class="input">
                <input type="text" placeholder="공격 성공 가능성·난이도를 입력해주세요" v-model="postData.data.renewal.attackFeasibility"/>
              </td>
              <th class="required">관련 취약점 위험도</th>
              <td class="input">
                <input type="text" placeholder="관련 취약점의 CVSS 점수를 입력해주세요" v-model="postData.data.renewal.relatedVulRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 예상 난이도 분석</th>
              <td class="input">
                <input type="text" placeholder="대응/조치 후 예상 난이도를 입력해주세요" v-model="postData.data.renewal.postActionDifficulty"/>
              </td>
              <th class="required">기준 평가 위험도</th>
              <td class="input">
                <input type="text" placeholder="대응 전 위험도를 입력해주세요" v-model="postData.data.renewal.standardEvalRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 위험도</th>
              <td class="input">
                <input type="text" placeholder="사고 발생 직후 위험도를 입력해주세요" v-model="postData.data.renewal.currentIncidentRisk"/>
              </td>
              <th class="required">대응/조치 후 목표 위험도</th>
              <td class="input">
                <input type="text" placeholder="대응 완료 후 목표 위험도를 입력해주세요" v-model="postData.data.renewal.targetRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 항목</th>
              <td class="input">
                <input type="text" placeholder="수행한 조치 내용을 입력해주세요" v-model="postData.data.renewal.actionItem"/>
              </td>
              <th class="required">대응/조치 계획 일정</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.renewalActionDate"
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
                      v-model="inputDateTime.renwalActionTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 내용</th>
              <td class="input">
                <input type="text" placeholder="실제로 조치한 내용을 입력해주세요" v-model="postData.data.renewal.actionContent"/>
              </td>
              <th class="required">대응/조치 현황</th>
              <td class="input">
                <input type="text" placeholder="현재 조치 진행 상태를 입력해주세요" v-model="postData.data.renewal.actionStatus"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_renewal_evidence_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberRenewalEvidenceData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_renewal_plan_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberRenewalPlanData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
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
              <th class="required">대응/조치 항목</th>
              <td class="input">
                <input type="text" placeholder="수행한 조치 내용을 입력해주세요" v-model="postData.data.finish.actionItem"/>
              </td>
              <th class="required">대응/조치 내용</th>
              <td class="input">
                <input type="text" placeholder="실제로 조치한 내용을 입력해주세요" v-model="postData.data.finish.actionContent"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 계획 일정</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.finishActionDate"
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
                      v-model="inputDateTime.finishActionTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">대응/조치 현황</th>
              <td class="input">
                <input type="text" placeholder="탐지에 사용된 솔루션·룰 등을 입력해주세요" v-model="postData.data.finish.actionStatus"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_final_evidence_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberFinalEvidenceData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사고 대응 보고서</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_cyber_report_final_report_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberFinalReportData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onCyberFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th class="required">대응 책임자</th>
              <td class="input">
                <input type="text" placeholder="대응 책임자 이름을 입력해주세요" v-model="postData.data.finish.responseManager"/>
              </td>
              <th class="required">대응 후 재평가 위험도</th>
              <td class="input">
                <input type="text" v-model="postData.data.finish.postReevalRisk" />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="cancel" @click="openCancelConfirm">취소</button>
        <button @click="postfetch_cyber" :disabled="!isAllInput">저장</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter, useRoute } from 'vue-router';
import { getDate } from '@/common/common';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 사이버 리포트 작성 POST 전체 데이터
const postData = ref({
  reportType: "cyber",
  data: {
    id: route.params.cyberReportId,
    vulnerabilityReportId: null,
    occurrenceDate: "",
    detectionDate: "",
    safetyIncident: "",
    financialDmg: "",
    privacyIncident: "",
    vehicleOpDmg: "",
    etcSystemDmg: "",
    isNetworkLawViolation: null,
    isMediaExposed: null,
    isMediaExposedInfo: "",
    affectedVehicleModel: "",
    dmgOccurrenceTime: "",
    affectedPartSystem: "",
    affectedVehicleCount: "",
    affectedServiceSystem: "",
    affectedPersonCount: "",
    potentialVehicleCount: "",
    potentialPersonCount: "",
    submissionDate: "",
    targetCompletionDate: "",
    reportContent: "",
    manager: "",
    renewal: {
      id: null,
      attackerInfo: "",
      attackPath: "",
      attackType: "",
      securityMeasureTech: "",
      vulCauseAnalysis: "",
      relatedVulInfo: "",
      attackFeasibility: "",
      relatedVulRisk: "",
      postActionDifficulty: "",
      standardEvalRisk: "",
      currentIncidentRisk: "",
      targetRisk: "",
      actionItem: "",
      actionPlanDate: "",
      actionContent: "",
      actionStatus: "",
    },
    finish: {
      id: null,
      actionItem: "",
      actionContent: "",
      actionPlanDate: "",
      actionStatus: "",
      responseManager: "",
      postReevalRisk: "",
    },
    fileAction: {
      fileType: "CYBER_REPORT",
      fileIdList: [],
      deleteFileIdList: null,
    },
  }
})

// 날짜/시간 따로 받는 데이터 상태값
const inputDateTime = ref({
  occurDate: "",
  occurTime: "",
  detectDate: "",
  detectTime: "",
  planDate: "",
  planTime: "",
  targetDate: "",
  targetTime: "",
  renewalActionDate: "",
  renwalActionTime: "",
  finishActionDate: "",
  finishActionTime: "",
})

// 모니터링 리포트 사이버 리포트 상세조회 전체 데이터
const getData = ref(null);

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  postData.value.data.occurrenceDate = `${inputDateTime.value.occurDate} ${inputDateTime.value.occurTime}`;
  postData.value.data.detectionDate = `${inputDateTime.value.detectDate} ${inputDateTime.value.detectTime}`;
  postData.value.data.submissionDate = `${inputDateTime.value.planDate} ${inputDateTime.value.planTime}`;
  postData.value.data.targetCompletionDate = `${inputDateTime.value.targetDate} ${inputDateTime.value.targetTime}`;
  postData.value.data.renewal.actionPlanDate = `${inputDateTime.value.renewalActionDate} ${inputDateTime.value.renwalActionTime}`;
  postData.value.data.finish.actionPlanDate = `${inputDateTime.value.finishActionDate} ${inputDateTime.value.finishActionTime}`;

  const inputBaseValid = Object.values(postData.value.data).every(
    (value) => value !== null && value !== undefined && value !== ""
  )

  const inputRenewalValid = Object.values(postData.value.data.renewal).every(
    (value) => value !== null && value !== undefined && value !== ""
  )

  const inputFinishValid = Object.values(postData.value.data.finish).every(
    (value) => value !== null && value !== undefined && value !== ""
  )

  return inputBaseValid && inputRenewalValid && inputFinishValid
});

// Date 데이터에서 시간 부분만 파싱
const parseTime = (dateTimeString) => {
  const time = dateTimeString.slice(11,16);

  return `${time}`;
}

// 사이버 리포트 작성 API 호출 
const postfetch_cyber = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);
    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패');
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// 모니터링 리포트 사이버 리포트 상세조회 API 호출
const getfetch_cyber_detail = async() => {
  try {
    const cyberReportId = route.params.cyberReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/cyber/${cyberReportId}`);
    getData.value = res.data.data.report;

    postData.value.data.vulnerabilityReportId = getData.value?.vulnerabilityReport?.id ?? ""
    postData.value.data.occurrenceDate = getDate(getData.value?.occurrenceDate) ?? ""
    postData.value.data.detectionDate = getDate(getData.value?.detectionDate) ?? ""
    postData.value.data.safetyIncident = getData.value?.safetyIncident ?? ""
    postData.value.data.financialDmg = getData.value?.financialDmg ?? ""
    postData.value.data.privacyIncident = getData.value?.privacyIncident ?? ""
    postData.value.data.vehicleOpDmg = getData.value?.vehicleOpDmg ?? ""
    postData.value.data.etcSystemDmg = getData.value?.etcSystemDmg ?? ""
    postData.value.data.isNetworkLawViolation = getData.value?.isNetworkLawViolation ?? ""
    postData.value.data.isMediaExposed = getData.value?.isMediaExposed ?? ""
    postData.value.data.isMediaExposedInfo = getData.value?.isMediaExposedInfo ?? ""
    postData.value.data.affectedVehicleModel = getData.value?.affectedVehicleModel ?? ""
    postData.value.data.dmgOccurrenceTime = getData.value?.dmgOccurrenceTime ?? ""
    postData.value.data.affectedPartSystem = getData.value?.affectedPartSystem ?? ""
    postData.value.data.affectedVehicleCount = getData.value?.affectedVehicleCount ?? ""
    postData.value.data.affectedServiceSystem = getData.value?.affectedServiceSystem ?? ""
    postData.value.data.affectedPersonCount = getData.value?.affectedPersonCount ?? ""
    postData.value.data.potentialVehicleCount = getData.value?.potentialVehicleCount ?? ""
    postData.value.data.potentialPersonCount = getData.value?.potentialPersonCount ?? ""
    postData.value.data.submissionDate = getDate(getData.value?.submissionDate) ?? ""
    postData.value.data.targetCompletionDate = getDate(getData.value?.targetCompletionDate) ?? ""
    postData.value.data.reportContent = getData.value?.reportContent ?? ""
    postData.value.data.manager = getData.value?.manager ?? ""
    postData.value.data.renewal.id = getData.value?.renewal?.id ?? ""
    postData.value.data.renewal.attackerInfo = getData.value?.renewal?.attackerInfo ?? ""
    postData.value.data.renewal.attackPath = getData.value?.renewal?.attackPath ?? ""
    postData.value.data.renewal.attackType = getData.value?.renewal?.attackType ?? ""
    postData.value.data.renewal.securityMeasureTech = getData.value?.renewal?.securityMeasureTech ?? ""
    postData.value.data.renewal.vulCauseAnalysis = getData.value?.renewal?.vulCauseAnalysis ?? ""
    postData.value.data.renewal.relatedVulInfo = getData.value?.renewal?.relatedVulInfo ?? ""
    postData.value.data.renewal.attackFeasibility = getData.value?.renewal?.attackFeasibility ?? ""
    postData.value.data.renewal.relatedVulRisk = getData.value?.renewal?.relatedVulRisk ?? ""
    postData.value.data.renewal.postActionDifficulty = getData.value?.renewal?.postActionDifficulty ?? ""
    postData.value.data.renewal.standardEvalRisk = getData.value?.renewal?.standardEvalRisk ?? ""
    postData.value.data.renewal.currentIncidentRisk = getData.value?.renewal?.currentIncidentRisk ?? ""
    postData.value.data.renewal.targetRisk = getData.value?.renewal?.targetRisk ?? ""
    postData.value.data.renewal.actionItem = getData.value?.renewal?.actionItem ?? ""
    postData.value.data.renewal.actionPlanDate = getDate(getData.value?.renewal?.actionPlanDate) ?? ""
    postData.value.data.renewal.actionContent = getData.value?.renewal?.actionContent ?? ""
    postData.value.data.renewal.actionStatus = getData.value?.renewal?.actionStatus ?? ""
    postData.value.data.finish.id = getData.value?.finish?.id ?? ""
    postData.value.data.finish.actionItem = getData.value?.finish?.actionItem ?? ""
    postData.value.data.finish.actionContent = getData.value?.finish?.actionContent ?? ""
    postData.value.data.finish.actionPlanDate = getDate(getData.value?.finish?.actionPlanDate) ?? ""
    postData.value.data.finish.actionStatus = getData.value?.finish?.actionStatus ?? ""
    postData.value.data.finish.responseManager = getData.value?.finish?.responseManager ?? ""
    postData.value.data.finish.postReevalRisk = getData.value?.finish?.postReevalRisk ?? ""

    inputDateTime.value.occurDate = getDate(getData.value?.occurrenceDate)
    inputDateTime.value.occurTime = parseTime(getData.value?.occurrenceDate)
    inputDateTime.value.detectDate = getDate(getData.value?.detectionDate)
    inputDateTime.value.detectTime = parseTime(getData.value?.detectionDate)
    inputDateTime.value.planDate = getDate(getData.value?.submissionDate)
    inputDateTime.value.planTime = parseTime(getData.value?.submissionDate)
    inputDateTime.value.targetDate = getDate(getData.value?.targetCompletionDate)
    inputDateTime.value.targetTime = parseTime(getData.value?.targetCompletionDate)
    inputDateTime.value.renewalActionDate = getDate(getData.value?.renewal?.actionPlanDate)
    inputDateTime.value.renwalActionTime = parseTime(getData.value?.renewal?.actionPlanDate)
    inputDateTime.value.finishActionDate = getDate(getData.value?.finish?.actionPlanDate)
    inputDateTime.value.finishActionTime = parseTime(getData.value?.finish?.actionPlanDate)

  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// Modal
const goList = () => {
  router.push({
    name: 'monitoring_cyber_detail',
    params: { cyberReportId: route.params.cyberReportId },
  })
}

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "수정되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "success",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 테스트 (현재 DLP 파일 반출 보안 문제로 file은 제외하고 테스트)
const cyberInitEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_EVIDENCE",
  // file: null,
})

const cyberInitProcedureData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_PROCEDURE",
  // file: null,
})

const cyberInitPlanData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_PLAN",
  // file: null,
})

const cyberRenewalEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "RENEWAL_EVIDENCE",
  // file: null,
})

const cyberRenewalPlanData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "RENEWAL_PLAN",
  // file: null,
})

const cyberFinalEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "FINAL_EVIDENCE",
  // file: null,
})

const cyberFinalReportData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "FINAL_REPORT",
  // file: null,
})

// 추후 file 속성 추가할때 추가할 예정
const onCyberFileChange = (e) => {
  cyberInitEvidenceData.value.file = e.target.files[0];
}

const postfetch_cyber_report_init_evidence_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberInitEvidenceData.value.fileType);
  formData.append("fileCategory",cyberInitEvidenceData.value.fileCategory);
  // formData.append("file",cyberInitEvidenceData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_init_procedure_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberInitProcedureData.value.fileType);
  formData.append("fileCategory",cyberInitProcedureData.value.fileCategory);
  // formData.append("file",cyberInitProcedureData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_init_plan_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberInitPlanData.value.fileType);
  formData.append("fileCategory",cyberInitPlanData.value.fileCategory);
  // formData.append("file",cyberInitPlanData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_renewal_evidence_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberRenewalEvidenceData.value.fileType);
  formData.append("fileCategory",cyberRenewalEvidenceData.value.fileCategory);
  // formData.append("file",cyberRenewalEvidenceData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_renewal_plan_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberRenewalPlanData.value.fileType);
  formData.append("fileCategory",cyberRenewalPlanData.value.fileCategory);
  // formData.append("file",cyberRenewalPlanData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_final_evidence_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberFinalEvidenceData.value.fileType);
  formData.append("fileCategory",cyberFinalEvidenceData.value.fileCategory);
  // formData.append("file",cyberFinalEvidenceData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_cyber_report_final_report_file = async() => {
  const formData = new FormData();
  formData.append("fileType",cyberFinalReportData.value.fileType);
  formData.append("fileCategory",cyberFinalReportData.value.fileCategory);
  // formData.append("file",cyberFinalReportData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}
//

onMounted(getfetch_cyber_detail);
</script>

<style scoped>
</style>